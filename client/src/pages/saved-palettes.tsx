import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { Palette } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Loader2, ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function SavedPalettes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(null);

  const {
    data: palettes = [],
    isLoading,
    error,
  } = useQuery<Palette[], Error>({
    queryKey: ["/api/palettes"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/palettes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/palettes"] });
      toast({
        title: "Palette deleted",
        description: "The palette has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = (palette: Palette) => {
    if (confirm("Are you sure you want to delete this palette?")) {
      deleteMutation.mutate(palette.id);
    }
  };

  // Helper function to parse colors string to array
  const parseColors = (colorsStr: string) => {
    try {
      return JSON.parse(colorsStr);
    } catch (e) {
      console.error("Failed to parse colors:", e);
      return [];
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Error Loading Palettes</h1>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Saved Palettes</h1>
        </div>
        <p className="text-muted-foreground">
          {palettes.length
            ? `You have ${palettes.length} saved palette${palettes.length !== 1 ? "s" : ""}.`
            : "You don't have any saved palettes yet."}
        </p>
      </header>

      {palettes.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/30">
          <h2 className="text-xl font-medium mb-2">No saved palettes</h2>
          <p className="text-muted-foreground mb-6">
            Create and save palettes from the home page to see them here.
          </p>
          <Link href="/">
            <Button>Create New Palette</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((palette) => {
            const colors = parseColors(palette.colors);
            return (
              <Card key={palette.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{palette.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(palette)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    {new Date(palette.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex h-20 rounded overflow-hidden">
                    {colors.map((color: string, i: number) => (
                      <div
                        key={i}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/?palette=${palette.id}`}>
                    <Button variant="outline" className="w-full">
                      Load Palette
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}