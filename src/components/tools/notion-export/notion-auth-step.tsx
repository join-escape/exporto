"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Lock } from "lucide-react";
// import { handleOAuthSignIn } from "@/lib/notion/auth";

interface AuthStepProps {
  isSignedIn: boolean;
  onComplete: (connection: {
    type: "token" | "oauth";
    token?: string;
    connected: boolean;
  }) => void;
}

export default function AuthStep({ isSignedIn, onComplete }: AuthStepProps) {
  const [integrationToken, setIntegrationToken] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  // Connect with integration token
  const handleTokenConnect = async () => {
    if (!integrationToken) {
      setError("Please enter an integration token");
      return;
    }

    setIsConnecting(true);
    setError("");

    try {
      // Here we would validate the token with Notion API
      // For now, we'll simulate a successful connection
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If successful:
      onComplete({
        type: "token",
        token: integrationToken,
        connected: true,
      });
    } catch (err) {
      setError("Failed to connect with token. Please verify and try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect with OAuth (only available when signed in)
  const handleOAuthConnect = async () => {
    setIsConnecting(true);
    setError("");

    try {
      // In a real implementation, this would initiate the OAuth flow
      //   await handleOAuthSignIn();

      // Simulate success for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onComplete({
        type: "oauth",
        connected: true,
      });
    } catch (err) {
      setError("OAuth connection failed. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="token">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="token">Integration Token</TabsTrigger>
          <TabsTrigger value="oauth" disabled={!isSignedIn}>
            OAuth Connection {!isSignedIn && "(Sign in required)"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="token" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="token">Notion Integration Token</Label>
            <div className="flex gap-2">
              <Input
                id="token"
                type="password"
                placeholder="Enter your Notion integration token"
                value={integrationToken}
                onChange={(e) => setIntegrationToken(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleTokenConnect}
                disabled={isConnecting || !integrationToken}
              >
                <Key className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              You can create an integration token in your{" "}
              <a
                href="https://www.notion.so/my-integrations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Notion integrations page
              </a>
            </p>
          </div>
        </TabsContent>

        <TabsContent value="oauth" className="space-y-4 mt-4">
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <Lock className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Connect with Notion</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Securely connect your Notion account to export your pages. No data
              is stored on our servers.
            </p>
            <Button
              onClick={handleOAuthConnect}
              disabled={isConnecting || !isSignedIn}
              className="w-full"
            >
              Connect with Notion
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="px-4 py-3 bg-destructive/10 border border-destructive/25 rounded-md text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
