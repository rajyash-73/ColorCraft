import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "./use-auth";
import { useToast } from "@/hooks/use-toast";
import type { Palette, CreatePalette } from "../../../shared/schema";

export function usePalettes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's palettes
  const {
    data: palettes = [],
    isLoading,
    error,
  } = useQuery<Palette[]>({
    queryKey: ["/api/palettes"],
    enabled: !!user,
    retry: false,
  });

  // Create palette mutation
  const createPaletteMutation = useMutation({
    mutationFn: async (paletteData: CreatePalette) => {
      const response = await apiRequest("POST", "/api/palettes", paletteData);
      return await response.json();
    },
    onSuccess: (newPalette: Palette) => {
      queryClient.setQueryData(["/api/palettes"], (old: Palette[] = []) => [...old, newPalette]);
      toast({
        title: "Palette saved",
        description: `"${newPalette.name}" has been saved to your collection.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Save failed",
        description: error.message || "Failed to save palette",
        variant: "destructive",
      });
    },
  });

  // Update palette mutation
  const updatePaletteMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CreatePalette> }) => {
      const response = await apiRequest("PUT", `/api/palettes/${id}`, data);
      return await response.json();
    },
    onSuccess: (updatedPalette: Palette) => {
      queryClient.setQueryData(["/api/palettes"], (old: Palette[] = []) =>
        old.map(palette => palette.id === updatedPalette.id ? updatedPalette : palette)
      );
      toast({
        title: "Palette updated",
        description: `"${updatedPalette.name}" has been updated.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update palette",
        variant: "destructive",
      });
    },
  });

  // Delete palette mutation
  const deletePaletteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/palettes/${id}`);
      return id;
    },
    onSuccess: (deletedId: number) => {
      queryClient.setQueryData(["/api/palettes"], (old: Palette[] = []) =>
        old.filter(palette => palette.id !== deletedId)
      );
      toast({
        title: "Palette deleted",
        description: "Palette has been removed from your collection.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete palette",
        variant: "destructive",
      });
    },
  });

  // Helper function to save current palette
  const savePalette = (name: string, colors: string[], description?: string, makePublic: boolean = false) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save palettes.",
        variant: "destructive",
      });
      return;
    }

    createPaletteMutation.mutate({
      name,
      colors,
      description,
      isPublic: makePublic,
    });
  };

  // Tracking functions
  const trackPaletteSave = async (paletteId: number) => {
    try {
      await apiRequest("POST", `/api/palettes/${paletteId}/track/save`);
    } catch (error) {
      // Silent fail for tracking
      console.warn("Failed to track palette save:", error);
    }
  };

  const trackPaletteDownload = async (paletteId: number) => {
    try {
      await apiRequest("POST", `/api/palettes/${paletteId}/track/download`);
    } catch (error) {
      // Silent fail for tracking
      console.warn("Failed to track palette download:", error);
    }
  };

  const trackPaletteView = async (paletteId: number) => {
    try {
      await apiRequest("POST", `/api/palettes/${paletteId}/track/view`);
    } catch (error) {
      // Silent fail for tracking
      console.warn("Failed to track palette view:", error);
    }
  };

  return {
    palettes,
    isLoading,
    error,
    savePalette,
    updatePalette: updatePaletteMutation.mutate,
    deletePalette: deletePaletteMutation.mutate,
    trackPaletteSave,
    trackPaletteDownload,
    trackPaletteView,
    isSaving: createPaletteMutation.isPending,
    isUpdating: updatePaletteMutation.isPending,
    isDeleting: deletePaletteMutation.isPending,
  };
}