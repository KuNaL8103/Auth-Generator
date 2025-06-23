"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileCode, Lightbulb, Loader2, ShieldCheck, Wand2 } from "lucide-react";
import {
  handleGenerateRoutesAction,
  handleSuggestImprovementsAction,
} from "./actions";
import { CodeBlock } from "@/components/code-block";

const defaultConfig = JSON.stringify(
  {
    providers: ["google", "facebook", "github"],
    session: {
      secret: "your-super-secret-session-key",
      maxAge: 86400,
    },
    database: {
      type: "mongodb",
      uri: "mongodb://localhost:27017/better-auth-db",
    },
  },
  null,
  2
);

export default function Home() {
  const { toast } = useToast();
  const [config, setConfig] = useState(defaultConfig);
  const [outputPath, setOutputPath] = useState("./auth.ts");
  const [generatedCode, setGeneratedCode] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedCode("");
    const result = await handleGenerateRoutesAction({
      authConfig: config,
      outputPath: outputPath,
    });
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error,
      });
    } else {
      setGeneratedCode(result.data || "");
      toast({
        title: "Success!",
        description: "API routes generated successfully.",
      });
    }
    setIsGenerating(false);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setSuggestions("");
    const result = await handleSuggestImprovementsAction({ config });
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: result.error,
      });
    } else {
      setSuggestions(result.data || "");
      toast({
        title: "Analysis Complete",
        description: "Configuration suggestions are ready.",
      });
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight font-headline">
            Godspeed Auth Generator
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Instantly generate Better Auth integration code for your Godspeed
          Framework application. Provide your configuration.
        </p>
      </header>

      <main className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Define your authentication methods and settings in JSON format.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="config-input">Better Auth Config (JSON)</Label>
              <Textarea
                id="config-input"
                value={config}
                onChange={(e) => setConfig(e.target.value)}
                className="font-code h-72"
                placeholder="Enter your Better Auth JSON config here..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="output-path">Output File Path</Label>
              <Input
                id="output-path"
                value={outputPath}
                onChange={(e) => setOutputPath(e.target.value)}
                placeholder="e.g., src/routes/auth.ts"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Routes
              </Button>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                variant="secondary"
                className="flex-1"
              >
                {isAnalyzing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lightbulb className="mr-2 h-4 w-4" />
                )}
                Analyze Config
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="text-primary" />
                Generated API Routes
              </CardTitle>
              <CardDescription>
                Your Godspeed API routes will appear here. Copy and add them to
                your project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : generatedCode ? (
                <CodeBlock code={generatedCode} />
              ) : (
                <div className="text-center text-sm text-muted-foreground py-10">
                  Click &quot;Generate Routes&quot; to see the magic happen.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-primary" />
                AI-Powered Suggestions
              </CardTitle>
              <CardDescription>
                Get tips and best practices for improving your auth setup.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : suggestions ? (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {suggestions}
                </p>
              ) : (
                <div className="text-center text-sm text-muted-foreground py-10">
                  Click &quot;Analyze Config&quot; for improvement ideas.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
