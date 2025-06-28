
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Key, ExternalLink } from 'lucide-react';

interface ApiKeyManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ isOpen, onClose }) => {
  const [newsApiKey, setNewsApiKey] = useState('');
  const [guardianApiKey, setGuardianApiKey] = useState('');
  const [nytApiKey, setNytApiKey] = useState('');
  const [showKeys, setShowKeys] = useState({
    newsapi: false,
    guardian: false,
    nyt: false
  });

  useEffect(() => {
    // Load existing keys from localStorage
    setNewsApiKey(localStorage.getItem('newsapi_key') || '');
    setGuardianApiKey(localStorage.getItem('guardian_key') || '');
    setNytApiKey(localStorage.getItem('nyt_key') || '');
  }, [isOpen]);

  const handleSave = () => {
    // Save to localStorage
    if (newsApiKey) localStorage.setItem('newsapi_key', newsApiKey);
    if (guardianApiKey) localStorage.setItem('guardian_key', guardianApiKey);
    if (nytApiKey) localStorage.setItem('nyt_key', nytApiKey);
    
    // Trigger a page reload to apply new keys
    window.location.reload();
  };

  const toggleShowKey = (service: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [service]: !prev[service] }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Key className="w-6 h-6" />
            API Key Configuration
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">NewsAPI</CardTitle>
              <p className="text-sm text-gray-600">
                Get your free API key from{' '}
                <a 
                  href="https://newsapi.org/register" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  newsapi.org <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="newsapi-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="newsapi-key"
                    type={showKeys.newsapi ? 'text' : 'password'}
                    value={newsApiKey}
                    onChange={(e) => setNewsApiKey(e.target.value)}
                    placeholder="Enter your NewsAPI key"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => toggleShowKey('newsapi')}
                  >
                    {showKeys.newsapi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">The Guardian</CardTitle>
              <p className="text-sm text-gray-600">
                Get your free API key from{' '}
                <a 
                  href="https://open-platform.theguardian.com/access/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  The Guardian Open Platform <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="guardian-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="guardian-key"
                    type={showKeys.guardian ? 'text' : 'password'}
                    value={guardianApiKey}
                    onChange={(e) => setGuardianApiKey(e.target.value)}
                    placeholder="Enter your Guardian API key"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => toggleShowKey('guardian')}
                  >
                    {showKeys.guardian ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New York Times</CardTitle>
              <p className="text-sm text-gray-600">
                Get your free API key from{' '}
                <a 
                  href="https://developer.nytimes.com/get-started" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  NYT Developer Portal <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="nyt-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="nyt-key"
                    type={showKeys.nyt ? 'text' : 'password'}
                    value={nytApiKey}
                    onChange={(e) => setNytApiKey(e.target.value)}
                    placeholder="Enter your NYT API key"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => toggleShowKey('nyt')}
                  >
                    {showKeys.nyt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save API Keys
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
