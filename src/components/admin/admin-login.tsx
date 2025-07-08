import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface AdminLoginProps {
  onLogin: (password: string) => void;
  onClose: () => void;
  isLoading: boolean;
  error: any;
}

export default function AdminLogin({ onLogin, onClose, isLoading, error }: AdminLoginProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
            Admin Access
          </DialogTitle>
          <DialogDescription>
            Enter the admin password to access the admin panel
          </DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Enter admin password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="adminPassword">Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                Incorrect password! Please try again.
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-semibold transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Access Admin Panel"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}