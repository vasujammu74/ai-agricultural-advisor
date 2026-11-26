'use client';

import { useCallback, useRef, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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

export default function DetectPage() {
  const { t, lang } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
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
      setError('Please select an image file.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image is too large. Please use an image under 8 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImageData(dataUrl);
      setImagePreview(dataUrl);
    };
    reader.onerror = () => setError('Could not read the image file.');
    reader.readAsDataURL(file);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const analyze = useCallback(async () => {
    if (!imageData) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/plant-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData, language: lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `Analysis failed (${res.status})`);
      }
      setResult(data as AnalysisResult);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [imageData, lang]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Microscope className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {t('detect.title')}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{t('detect.subtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload / preview */}
        <Card className="border-border/60">
          <CardContent className="p-5">
            {!imagePreview ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={cn(
                  'flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors',
                  dragOver ? 'border-primary bg-primary/5' : 'border-border/70 bg-secondary/30'
                )}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-medium">{t('detect.drop')}</p>
                  <p className="mt-1 text-sm text-muted-foreground">PNG, JPG up to 8 MB</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    {t('detect.upload')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                    {t('detect.camera')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl border border-border/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Uploaded plant"
                    className="h-64 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={reset}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
                    aria-label={t('detect.clear')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    className="flex-1 gap-2 bg-primary"
                    onClick={analyze}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('detect.analyzing')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        {t('detect.analyze')}
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={reset} disabled={loading}>
                    {t('detect.clear')}
                  </Button>
                </div>
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
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="border-border/60">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Leaf className="h-4 w-4 text-primary" />
              {t('detect.result')}
            </div>

            {error && (
              <div className="mb-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {!result && !error && (
              <div className="flex h-48 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                <Leaf className="h-10 w-10 opacity-30" />
                <p className="text-sm">{t('detect.noResult')}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {result.demo && (
                  <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{t('detect.demo')}</span>
                  </div>
                )}

                {result.message && !result.plant && (
                  <div className="rounded-lg border border-border/60 bg-secondary/40 p-3 text-sm">
                    {result.message}
                  </div>
                )}

                {result.plant && (
                  <div className="rounded-xl border border-border/60 bg-secondary/30 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Leaf className="h-4 w-4" />
                        {t('detect.common')}
                      </div>
                      {result.plant.probability > 0 && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {result.plant.probability}% match
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold">{result.plant.name}</h3>
                    {(result.plant.commonNames ||[]).length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {result.plant.commonNames.join(', ')}
                      </p>
                    )}
                    {result.plant.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {result.plant.description.slice(0, 320)}
                        {result.plant.description.length > 320 ? '…' : ''}
                      </p>
                    )}
                  </div>
                )}

                {(result.diseases || []).length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <HeartPulse className="h-4 w-4 text-destructive" />
                      {result.diseases.length > 1 ? 'Possible conditions' : 'Detected condition'}
                    </div>
                    {(result.diseases || []).map((d, i) => (
                      <div
                        key={i}
                        className={cn(
                          'rounded-xl border p-4',
                          d.isHealthy
                            ? 'border-accent/40 bg-accent/10'
                            : 'border-border/60 bg-card'
                        )}
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold">{d.name}</h4>
                            {d.commonNames.length > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {d.commonNames.join(', ')}
                              </p>
                            )}
                          </div>
                          <Badge
                            variant="secondary"
                            className={
                              d.isHealthy
                                ? 'bg-accent/20 text-accent-foreground'
                                : 'bg-destructive/10 text-destructive'
                            }
                          >
                            {d.probability}%
                          </Badge>
                        </div>

                        {d.isHealthy ? (
                          <p className="flex items-center gap-1.5 text-sm font-medium text-accent-foreground">
                            <ShieldCheck className="h-4 w-4" />
                            This plant appears healthy.
                          </p>
                        ) : (
                          <div className="space-y-3 text-sm">
                            {d.description && (
                              <div>
                                <p className="leading-relaxed text-muted-foreground">
                                  {d.description.slice(0, 280)}
                                  {d.description.length > 280 ? '…' : ''}
                                </p>
                              </div>
                            )}
                            {d.symptoms && (
                              <div className="rounded-lg bg-amber-50 p-2.5 dark:bg-amber-950/30">
                                <p className="mb-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                                  Symptoms
                                </p>
                                <p className="text-xs text-amber-800 dark:text-amber-200">
                                  {d.symptoms}
                                </p>
                              </div>
                            )}
                            {d.treatment && (
                              <div className="flex gap-2">
                                <Pill className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <div>
                                  <p className="mb-0.5 font-semibold text-primary">
                                    {t('detect.treatment')}
                                  </p>
                                  <p className="whitespace-pre-line text-muted-foreground">
                                    {d.treatment}
                                  </p>
                                </div>
                              </div>
                            )}
                            {d.prevention && (
                              <div className="flex gap-2">
                                <Ban className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
                                <div>
                                  <p className="mb-0.5 font-semibold text-accent-foreground">
                                    {t('detect.prevention')}
                                  </p>
                                  <p className="whitespace-pre-line text-muted-foreground">
                                    {d.prevention}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {result.plant && result.diseases.length === 0 && !result.message && (
                  <div className="flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm text-accent-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    No diseases detected — the plant appears healthy.
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="mt-6 border-border/60 bg-secondary/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Tips for best results</p>
              <ul className="mt-1.5 list-inside list-disc space-y-1">
                <li>Take a clear, well-lit photo of the affected leaf or plant part.</li>
                <li>Focus on the area showing symptoms — spots, discolouration, or damage.</li>
                <li>Avoid blurry or distant shots; fill the frame with the plant.</li>
                <li>For an accurate result, photograph one plant at a time.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
