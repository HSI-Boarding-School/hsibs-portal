'use client';

import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { DashboardContent } from 'src/layouts/dashboard';
import { LucideIcon } from 'src/components/lucide-icon';
import { useMockedUser } from 'src/auth/hooks';
import {
  getUserLinks,
  createLink,
  updateLink,
  deleteLink,
} from 'src/lib/supabase-client';

// ----------------------------------------------------------------------

export function LinkManagementView() {
  const { user } = useMockedUser();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    thumbnail: '',
    thumbnailFile: null,
  });

  // Fetch links on mount
  useEffect(() => {
    if (user?.id) {
      fetchLinks();
    }
  }, [user?.id]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const data = await getUserLinks(user.id);
      // Ensure data is always an array
      const linksArray = Array.isArray(data) ? data : [];
      setLinks(linksArray);
    } catch (error) {
      console.error('Error fetching links:', error);
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (link = null) => {
    if (link) {
      setEditingId(link.id);
      setFormData({
        title: link.title,
        url: link.url,
        thumbnail: link.thumbnail,
        thumbnailFile: null,
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', url: '', thumbnail: '', thumbnailFile: null });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    setFormData({ title: '', url: '', thumbnail: '', thumbnailFile: null });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.url) {
      alert('Nama dan URL harus diisi');
      return;
    }

    if (!editingId && !formData.thumbnail) {
      alert('Thumbnail harus diupload');
      return;
    }

    try {
      if (editingId) {
        // Update existing link
        const updateData = {
          title: formData.title,
          url: formData.url,
        };
        if (formData.thumbnail) {
          updateData.thumbnail = formData.thumbnail;
        }
        await updateLink(editingId, updateData);
      } else {
        // Create new link
        await createLink({
          user_id: user.id,
          title: formData.title,
          url: formData.url,
          thumbnail: formData.thumbnail,
          total_clicks: 0,
        });
      }
      await fetchLinks();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving link:', error);
      alert('Gagal menyimpan link');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus link ini?')) {
      try {
        await deleteLink(id);
        await fetchLinks();
      } catch (error) {
        console.error('Error deleting link:', error);
        alert('Gagal menghapus link');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi file type
      if (!file.type.startsWith('image/')) {
        alert('Silakan pilih file gambar');
        return;
      }

      // Validasi file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file tidak boleh lebih dari 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnailFile: file,
          thumbnail: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <DashboardContent maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ typography: 'h4' }}>HSIBS Portal Management</Box>
        <Button
          variant="contained"
          startIcon={<LucideIcon icon="solar:add-circle-bold" />}
          onClick={() => handleOpenDialog()}
        >
          Add Link
        </Button>
      </Box>

      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ minWidth: 800 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', gap: 0, bgcolor: 'background.neutral', p: 2, fontWeight: 600, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box>Nama Link</Box>
              <Box>URL</Box>
              <Box sx={{ textAlign: 'center' }}>Clicks</Box>
              <Box sx={{ textAlign: 'center' }}>Dibuat</Box>
              <Box sx={{ textAlign: 'right' }}>Aksi</Box>
            </Box>
            {links.map((link) => (
              <Box
                key={link.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr',
                  gap: 0,
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {link.thumbnail && (
                    <Box
                      component="img"
                      src={link.thumbnail}
                      sx={{ width: 32, height: 32, borderRadius: 1, objectFit: 'cover' }}
                    />
                  )}
                  <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {link.title}
                  </Box>
                </Box>
                <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem', color: 'text.secondary' }}>
                  {link.url}
                </Box>
                <Box sx={{ textAlign: 'center' }}>{link.total_clicks || 0}</Box>
                <Box sx={{ textAlign: 'center', fontSize: '0.875rem' }}>
                  {new Date(link.created_at).toLocaleDateString('id-ID')}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(link)}
                    title="Edit"
                  >
                    <LucideIcon icon="solar:pen-bold" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(link.id)}
                    title="Delete"
                    sx={{ color: 'error.main' }}
                  >
                    <LucideIcon icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>

      {/* Dialog Add/Edit Link */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Link' : 'Tambah Link Baru'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Nama Link"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Contoh: Instagram"
            />
            <TextField
              fullWidth
              label="URL"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com"
            />

            {/* Thumbnail Upload Section */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Thumbnail
              </Typography>

              {formData.thumbnail && (
                <Box
                  component="img"
                  src={formData.thumbnail}
                  sx={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 1.5,
                  }}
                />
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <Button
                fullWidth
                variant="outlined"
                startIcon={<LucideIcon icon="solar:upload-bold" />}
                onClick={handleUploadClick}
              >
                Upload Thumbnail
              </Button>

              {formData.thumbnailFile && (
                <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
                  File: {formData.thumbnailFile.name}
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleSave} variant="contained">
            {editingId ? 'Update' : 'Tambah'}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
