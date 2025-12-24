import { useState, useMemo } from "react";
import { allProjects, initialDeployments } from "@/features/data/projects";
import { toast } from "sonner";

export function useProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isSaving, setIsSaving] = useState(false);

  // STATES ACTION MODALS
  const [isDeleting, setIsDeleting] = useState(false);

  // State untuk Logs
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState("");

  // State untuk Rollback
  const [isRollbackAlertOpen, setIsRollbackAlertOpen] = useState(false);
  const [rollbackTarget, setRollbackTarget] = useState<{ id: string, commit: string } | null>(null);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.repo.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesTab = true;
      if (activeTab === "Production") {
        matchesTab = project.status === "Live";
      } else if (activeTab === "Development") {
        matchesTab = project.status === "Building" || project.status === "Offline";
      }

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);


  const filteredDeployments = initialDeployments.filter(d =>
    d.commit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.commitId.includes(searchQuery.toLowerCase())
  );


  const handleViewLogs = (commitId: string) => {
    setSelectedLogId(commitId);
    setIsLogsOpen(true);
  };

  const confirmRollback = (deploy: typeof initialDeployments[0]) => {
    setRollbackTarget({ id: deploy.commitId, commit: deploy.commit });
    setIsRollbackAlertOpen(true);
  };

  const handleRollbackAction = () => {
    setIsRollbackAlertOpen(false);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: `Rolling back to ${rollbackTarget?.id}...`,
      success: 'Rollback successful! Deployment started.',
      error: 'Rollback failed',
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Pengaturan project berhasil disimpan!");
    }, 1500);
  };

  const handleDeleteProject = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      toast.error("Project telah dihapus (Simulasi)");
    }, 2000);
  };
  // 4. Handler Copy Commit ID
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Commit ID ${text} disalin ke clipboard!`);
  };

  // 5. Handler Configure Git
  const handleConfigureGit = () => {
    toast.info("Mengarahkan ke GitHub App integration...");
    window.open('https://github.com/apps/nusantara-saas', '_blank');
  };
  return {
    searchQuery,
    activeTab,
    filteredProjects,
    filteredDeployments,
    isSaving,
    isRollbackAlertOpen,
    rollbackTarget,
    selectedLogId,
    isLogsOpen,
    isDeleting,
    setIsSaving,
    setActiveTab,
    setIsDeleting,
    setSearchQuery,
    setIsLogsOpen,
    setSelectedLogId,
    setIsRollbackAlertOpen,
    handleViewLogs,
    handleSaveSettings,
    handleDeleteProject,
    confirmRollback,
    handleRollbackAction,
    copyToClipboard,
    handleConfigureGit
  };
}