import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Bot } from "lucide-react";

interface FeatureCardProps {
    children: React.ReactNode;
    formId: string;
    isPending: boolean;
    hasResult: boolean;
    hasError: boolean;
    errorMessage?: string;
    resultComponent: React.ReactNode;
    buttonText?: string;
    pendingButtonText?: string;
}

export function FeatureCard({
    children,
    formId,
    isPending,
    hasResult,
    hasError,
    errorMessage,
    resultComponent,
    buttonText = "Generate",
    pendingButtonText = "Generating..."
}: FeatureCardProps) {
    return (
        <>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex-col items-start gap-4 border-t px-6 py-4">
                <Button type="submit" form={formId} disabled={isPending} className="min-w-[120px]">
                    {isPending ? (
                      <>
                        <Bot className="mr-2 h-4 w-4 animate-spin" />
                        {pendingButtonText}
                      </>
                    ) : buttonText}
                </Button>
                {isPending && (
                    <div className="w-full space-y-4">
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                )}
                {hasError && (
                    <Alert variant="destructive" className="w-full">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMessage || "An unexpected error occurred. Please try again."}</AlertDescription>
                    </Alert>
                )}
                {hasResult && !isPending && !hasError && (
                    <div className="w-full rounded-lg border bg-muted p-4 animate-in fade-in-50">
                        <h3 className="font-semibold mb-3 font-headline text-lg">Result</h3>
                        <div className="prose prose-sm max-w-none text-foreground">
                            {resultComponent}
                        </div>
                    </div>
                )}
            </CardFooter>
        </>
    )
}
