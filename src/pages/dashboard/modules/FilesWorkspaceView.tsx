import React, { useState } from 'react';
import { Folder, FileText, Plus, Download, Eye, HardDrive, Film, Image, Music, Lock, CheckCircle2 } from 'lucide-react';
import { useClub } from '../../../context/ClubContext';
import { ClubFile } from '../../../types';
import { sfx } from '../../../utils/audio';

const FOLDER_CATEGORIES = [
  { id: 'all', name: 'All Master Archives' },
  { id: '01_Administration', name: '01_Administration' },
  { id: '02_Movie_Making', name: '02_Movie_Making' },
  { id: '03_Short_Film', name: '03_Short_Film' },
  { id: '04_Reels', name: '04_Reels' },
  { id: '05_Social_Media', name: '05_Social_Media' },
  { id: '06_Event_Management', name: '06_Event_Management' },
  { id: '07_Projects', name: '07_Projects' },
  { id: '08_Reports', name: '08_Reports' },
  { id: '09_Final_Content', name: '09_Final_Content' },
];

export const FilesWorkspaceView: React.FC = () => {
  const { files, addFile, currentUser } = useClub();
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<ClubFile | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    folder: '02_Movie_Making',
    type: 'PDF' as const,
    size: '4.2 MB',
    isApproved: true
  });

  const filteredFiles = files.filter(f => selectedFolder === 'all' || f.folder === selectedFolder);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playClapper();
    addFile({
      name: formData.name,
      folder: formData.folder,
      type: formData.type,
      size: formData.size,
      uploadedBy: currentUser.name,
      uploadedAt: '2026-03-20',
      isApproved: true,
      fileUrl: '#'
    });
    setIsUploading(false);
    setFormData({ name: '', folder: '02_Movie_Making', type: 'PDF', size: '4.2 MB', isApproved: true });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'MP4':
      case 'MOV':
        return <Film className="w-5 h-5 text-red-500" />;
      case 'PNG':
      case 'JPG':
      case 'PSD':
        return <Image className="w-5 h-5 text-purple-400" />;
      case 'WAV':
      case 'MP3':
        return <Music className="w-5 h-5 text-amber-400" />;
      default:
        return <FileText className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e14] border border-zinc-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-400" />
            <span>9-Folder Production Drive & Asset Archive</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400">Master scripts, call sheets, ProRes master cuts & project deliverables</p>
        </div>

        <button
          onClick={() => {
            sfx.playClapper();
            setIsUploading(!isUploading);
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-950/60"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Asset / Script</span>
        </button>
      </div>

      {/* Upload Form */}
      {isUploading && (
        <form onSubmit={handleUpload} className="p-6 rounded-3xl bg-[#0e0e14] border border-blue-900/50 space-y-4 animate-in fade-in">
          <h4 className="text-sm font-mono font-bold text-blue-400 uppercase">Upload Production File</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">File Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Echoes_Final_Draft_v4.pdf"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Target 9-Folder Category</label>
              <select
                value={formData.folder}
                onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              >
                {FOLDER_CATEGORIES.filter(f => f.id !== 'all').map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">File Type Format</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              >
                <option value="PDF">PDF (Document / Script)</option>
                <option value="MP4">MP4 (Video Draft)</option>
                <option value="MOV">MOV (ProRes Cut)</option>
                <option value="PNG">PNG / JPG (Poster Artwork)</option>
                <option value="PSD">PSD (Photoshop Project)</option>
                <option value="WAV">WAV (Audio Master)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsUploading(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold"
            >
              Commit File to Drive →
            </button>
          </div>
        </form>
      )}

      {/* 9-Folder Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {FOLDER_CATEGORIES.map((cat) => {
          const isSelected = selectedFolder === cat.id;
          const count = cat.id === 'all' ? files.length : files.filter(f => f.folder === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => {
                sfx.playSubtleChime();
                setSelectedFolder(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="p-5 rounded-2xl bg-[#0e0e14] border border-zinc-800/80 hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4 group shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  {getFileIcon(file.type)}
                </div>

                <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 font-mono text-[10px] uppercase">
                  {file.size}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                  {file.name}
                </h4>
                <p className="text-[11px] font-mono text-zinc-500 mt-0.5 truncate">
                  Folder: {file.folder}
                </p>
              </div>

              <div className="text-[10px] font-mono text-zinc-500 flex justify-between pt-1">
                <span>By: {file.uploadedBy}</span>
                <span>{file.uploadedAt}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  sfx.playSubtleChime();
                  setPreviewFile(file);
                }}
                className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <a
                href={file.fileUrl}
                download={file.name}
                onClick={(e) => {
                  e.preventDefault();
                  sfx.playClapper();
                  alert(`Downloading asset: ${file.name}`);
                }}
                className="px-3 py-1 rounded-lg bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono flex items-center gap-1 hover:bg-blue-900"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-zinc-950 rounded-3xl border border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                {getFileIcon(previewFile.type)}
                <span className="text-sm font-mono font-bold text-white">{previewFile.name}</span>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-zinc-500 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e0e14] border border-zinc-800 text-center space-y-3 font-mono text-xs">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto">
                {getFileIcon(previewFile.type)}
              </div>
              <p className="text-white font-bold">{previewFile.name}</p>
              <p className="text-zinc-400">File Format: {previewFile.type} • Size: {previewFile.size}</p>
              <p className="text-zinc-500">Target Folder: {previewFile.folder}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-5 py-2 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
