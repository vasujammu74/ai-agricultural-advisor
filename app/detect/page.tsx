'use client';

import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  Loader2,
  Leaf,
  AlertCircle,
  Info,
  X,
  Microscope,
  HeartPulse,
  ShieldCheck,
  Pill,
  Ban,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

interface DiseaseResult {
  name: string;
  commonNames: string[];
  probability: number;
  isHealthy: boolean;
  description?: string;
  symptoms?: string;
  treatment?: string;
  prevention?: string;
  similarImage?: string;
}

interface PlantResult {
  name: string;
  commonNames: string[];
  probability: number;
  description?: string;
  image?: string;
}

interface AnalysisResult {
  demo: boolean;
  plant: PlantResult | null;
  diseases: DiseaseResult[];
  isPlant: boolean;
  message?: string;
}

// Safely convert strings, arrays and objects into displayable text.
function toDisplayText(value: unknown): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value.trim() || undefined;
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => toDisplayText(item))
      .filter((item): item is string => Boolean(item));

    return items.length ? items.join('\n') : undefined;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(
      value as Record<string, unknown>
    );

    const items = entries
      .map(([key, item]) => {
        const text = toDisplayText(item);
        return text ? `${key}: ${text}` : undefined;
      })
      .filter((item): item is string => Boolean(item));

    return items.length ? items.join('\n') : undefined;
  }

  return undefined;
}

function toNameList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === 'string') {
        return item;
      }

      if (item && typeof item === 'object') {
        return toDisplayText(
          (item as Record<string, unknown>).name
        );
      }

      return undefined;
    })
    .filter((item): item is string => Boolean(item));
}

function toProbability(value: unknown): number {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.min(100, Math.max(0, number));
}

function safeUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  try {
    const url = new URL(value);

    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return value;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function normalizeResponse(data: unknown): AnalysisResult {
  const raw =
    data && typeof data === 'object'
      ? (data as Record<string, unknown>)
      : {};

  const rawPlant =
    raw.plant && typeof raw.plant === 'object'
      ? (raw.plant as Record<string, unknown>)
      : null;

  const rawDiseases = Array.isArray(raw.diseases)
    ? raw.diseases
    : [];

  const plant: PlantResult | null = rawPlant
    ? {
        name:
          toDisplayText(rawPlant.name) || 'Unknown plant',
        commonNames: toNameList(rawPlant.commonNames),
        probability: toProbability(rawPlant.probability),
        description: toDisplayText(rawPlant.description),
        image: safeUrl(rawPlant.image),
      }
    : null;

  const diseases: DiseaseResult[] = rawDiseases
    .filter(
      (item): item is Record<string, unknown> =>
        Boolean(item) && typeof item === 'object'
    )
    .map((item) => ({
      name:
        toDisplayText(item.name) || 'Unknown condition',
      commonNames: toNameList(item.commonNames),
      probability: toProbability(item.probability),
      isHealthy: Boolean(item.isHealthy),
      description: toDisplayText(item.description),
      symptoms: toDisplayText(item.symptoms),
      treatment: toDisplayText(item.treatment),
      prevention: toDisplayText(item.prevention),
      similarImage: safeUrl(item.similarImage),
    }));

  return {
    demo: Boolean(raw.demo),
    plant,
    diseases,
    isPlant: raw.isPlant !== false,
    message: toDisplayText(raw.message),
  };
}

export default function DetectPage() {
  const { lang } = useLanguage();

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [imageData, setImageData] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [result, setResult] =
    useState<AnalysisResult | null>(null);

  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setImagePreview(null);
    setImageData(null);
    setResult(null);
    setError(null);
  }, []);

  const handleFile = useCallback((file: File) => {
    setError(null);
    setResult(null);

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Image is too large. Please select an image under 8 MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setError('Could not read the image. Please try again.');
        return;
      }

      setImageData(reader.result);
      setImagePreview(reader.result);
    };

    reader.onerror = () => {
      setError('Could not read the image file.');
    };

    reader.readAsDataURL(file);
  }, []);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    event.target.value = '';
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const analyze = useCallback(async () => {
    if (!imageData || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/plant-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          language: lang,
        }),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        const message =
          data &&
          typeof data === 'object' &&
          'error' in data
            ? toDisplayText(
                (data as Record<string, unknown>).error
              )
            : undefined;

        throw new Error(
          message || `Analysis failed (${response.status}).`
        );
      }

      const normalized = normalizeResponse(data);
      setResult(normalized);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [imageData, loading, lang]);

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Page heading */}
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-950">
            <Leaf className="h-9 w-9 text-green-700 dark:text-green-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Plant Disease Detection
          </h1>

          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            Upload a clear photo of your plant or leaf.
            Our plant analysis service will identify the plant
            and check for possible diseases.
          </p>
        </div>

        {/* Upload section */}
        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center gap-2">
            <Microscope className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold">
              Upload Plant Image
            </h2>
          </div>

          {!imagePreview ? (
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`rounded-xl border-2 border-dashed p-8 text-center transition ${
                dragOver
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                  : 'border-muted-foreground/30'
              }`}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                <ImageIcon className="h-7 w-7 text-green-700 dark:text-green-400" />
              </div>

              <h3 className="font-semibold">
                Choose a plant image
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop an image here, or select one
                from your device.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white hover:bg-green-800"
                >
                  <Upload className="h-4 w-4" />
                  Choose Image
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium hover:bg-muted"
                >
                  <Camera className="h-4 w-4" />
                  Take Photo
                </button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Supported image formats. Maximum size: 8 MB.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl border bg-muted">
                <img
                  src={imagePreview}
                  alt="Selected plant"
                  className="mx-auto max-h-96 w-full object-contain"
                />

                <button
                  type="button"
                  onClick={reset}
                  aria-label="Remove selected image"
                  className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 rounded-lg border px-4 py-3 text-sm font-medium hover:bg-muted"
                >
                  Change Image
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="flex-1 rounded-lg border px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  Remove Image
                </button>
              </div>

              <button
                type="button"
                onClick={analyze}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3.5 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Plant...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Analyze Plant
                  </>
                )}
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onInputChange}
          />

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={onInputChange}
          />
        </section>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div className="flex-1">
              <p className="font-semibold">
                Analysis Error
              </p>
              <p className="mt-1 text-sm">{error}</p>
            </div>

            <button
              type="button"
              onClick={() => setError(null)}
              aria-label="Dismiss error"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Loading message */}
        {loading && (
          <div className="rounded-xl border bg-card p-8 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-green-600" />

            <h3 className="mt-4 font-semibold">
              Analyzing your plant
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Please wait while the plant analysis service
              examines your image.
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <section className="space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-bold">
                Analysis Results
              </h2>
            </div>

            {/* Demo warning */}
            {result.demo && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                <Info className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm">
                  Demonstration results are being displayed.
                  These are not live plant diagnosis results.
                </p>
              </div>
            )}

            {/* Not a plant */}
            {!result.isPlant && (
              <div className="rounded-xl border bg-card p-6 text-center">
                <Ban className="mx-auto h-10 w-10 text-amber-600" />

                <h3 className="mt-3 text-lg font-semibold">
                  No Plant Detected
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {result.message ||
                    'This image does not appear to contain a plant. Please upload a clear plant or leaf photo.'}
                </p>
              </div>
            )}

            {/* Plant information */}
            {result.isPlant && result.plant && (
              <div className="overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center gap-2 border-b bg-green-50 p-4 dark:bg-green-950/30">
                  <Leaf className="h-5 w-5 text-green-700 dark:text-green-400" />
                  <h3 className="font-semibold">
                    Identified Plant
                  </h3>
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="text-xl font-bold">
                      {result.plant.name}
                    </h4>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 dark:bg-green-950 dark:text-green-300">
                      {result.plant.probability}% match
                    </span>
                  </div>

                  {result.plant.commonNames.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Common names:{' '}
                      {result.plant.commonNames.join(', ')}
                    </p>
                  )}

                  {result.plant.description && (
                    <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {result.plant.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Disease information */}
            {result.isPlant && result.diseases.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-red-600" />

                  <h3 className="font-semibold">
                    {result.diseases.length > 1
                      ? 'Possible Conditions'
                      : 'Detected Condition'}
                  </h3>
                </div>

                {result.diseases.map((disease, index) => (
                  <div
                    key={`${disease.name}-${index}`}
                    className="overflow-hidden rounded-xl border bg-card"
                  >
                    <div className="space-y-3 border-b p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h4 className="text-lg font-bold">
                          {disease.name}
                        </h4>

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800 dark:bg-red-950 dark:text-red-300">
                          {disease.probability}% confidence
                        </span>
                      </div>

                      {disease.commonNames.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {disease.commonNames.join(', ')}
                        </p>
                      )}

                      {disease.isHealthy && (
                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-950 dark:text-green-300">
                          Healthy plant
                        </span>
                      )}
                    </div>

                    <div className="space-y-4 p-5">
                      {disease.description && (
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <Info className="h-4 w-4 text-blue-600" />
                            <h5 className="text-sm font-semibold">
                              About this condition
                            </h5>
                          </div>

                          <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                            {disease.description}
                          </p>
                        </div>
                      )}

                      {disease.symptoms && (
                        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950/30">
                          <p className="mb-1 text-sm font-semibold text-amber-800 dark:text-amber-300">
                            Symptoms
                          </p>

                          <p className="whitespace-pre-line text-sm leading-6 text-amber-900 dark:text-amber-200">
                            {disease.symptoms}
                          </p>
                        </div>
                      )}

                      {disease.treatment && (
                        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
                          <div className="mb-2 flex items-center gap-2">
                            <Pill className="h-4 w-4 text-green-700 dark:text-green-400" />

                            <h5 className="text-sm font-semibold text-green-800 dark:text-green-300">
                              Treatment
                            </h5>
                          </div>

                          <p className="whitespace-pre-line text-sm leading-6 text-green-900 dark:text-green-200">
                            {disease.treatment}
                          </p>
                        </div>
                      )}

                      {disease.prevention && (
                        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                          <div className="mb-2 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-blue-700 dark:text-blue-400" />

                            <h5 className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                              Prevention
                            </h5>
                          </div>

                          <p className="whitespace-pre-line text-sm leading-6 text-blue-900 dark:text-blue-200">
                            {disease.prevention}
                          </p>
                        </div>
                      )}

                      {disease.similarImage && (
                        <div>
                          <p className="mb-2 text-sm font-semibold">
                            Similar reference image
                          </p>

                          <img
                            src={disease.similarImage}
                            alt="Similar disease reference"
                            className="max-h-48 rounded-lg border object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {!disease.description &&
                        !disease.symptoms &&
                        !disease.treatment &&
                        !disease.prevention && (
                          <p className="text-sm text-muted-foreground">
                            Additional disease information is
                            not available from the analysis service.
                          </p>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No disease suggestions */}
            {result.isPlant &&
              result.plant &&
              result.diseases.length === 0 && (
                <div className="rounded-xl border border-green-300 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/30">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-700 dark:text-green-400" />

                    <h3 className="font-semibold text-green-800 dark:text-green-300">
                      No Disease Suggestions Returned
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-green-900 dark:text-green-200">
                    The plant was identified, but the analysis
                    service did not return any disease suggestions.
                    This does not guarantee that the plant is healthy.
                  </p>
                </div>
              )}

            {/* General service message */}
            {result.message && result.isPlant && (
              <div className="rounded-xl border bg-card p-4">
                <p className="text-sm text-muted-foreground">
                  {result.message}
                </p>
              </div>
            )}

            {/* Disclaimer */}
            {result.isPlant && (
              <div className="flex items-start gap-3 rounded-xl border bg-muted/40 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                <p className="text-xs leading-5 text-muted-foreground">
                  AI analysis is an informational aid, not a
                  confirmed agricultural diagnosis. Check the
                  plant symptoms carefully and consult a qualified
                  agricultural expert before applying pesticides
                  or other chemical treatments. Always follow
                  product label instructions.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={reset}
              className="w-full rounded-lg border px-5 py-3 text-sm font-semibold hover:bg-muted"
            >
              Analyze Another Plant
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
