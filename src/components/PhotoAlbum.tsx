import React, { useState, useEffect } from 'react';
import { UserType } from '../App';
import { X, Upload } from 'lucide-react';
import ImageModal from './ImageModal';

interface Photo {
  id: string;
  url: string;
}

interface PhotoAlbumProps {
  personId: string;
  userType: UserType;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ personId, userType }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const storedPhotos = localStorage.getItem(`photos-${personId}`);
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
    }
  }, [personId]);

  const savePhotos = (updatedPhotos: Photo[]) => {
    localStorage.setItem(`photos-${personId}`, JSON.stringify(updatedPhotos));
    setPhotos(updatedPhotos);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            if (img.width <= 1920 && img.height <= 1080) {
              const newPhoto: Photo = {
                id: Date.now().toString(),
                url: e.target?.result as string,
              };
              savePhotos([...photos, newPhoto]);
            } else {
              alert('La imagen debe ser menor a 1920x1080 píxeles.');
            }
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Solo se permiten archivos PNG o JPEG.');
      }
    });
  };

  const handleDelete = (photoId: string) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    savePhotos(updatedPhotos);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Álbum de Fotos</h2>
      <p className="text-sm text-gray-600 mb-4">Puede agregar fotos al álbum. Solo el administrador puede eliminarlas.</p>
      <div
        className={`border-2 border-dashed p-4 mb-4 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Arrastra y suelta imágenes aquí o</p>
        <label className="cursor-pointer text-blue-500 hover:text-blue-600">
          <span>selecciona archivos</span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              src={photo.url}
              alt="Foto del álbum"
              className="w-full h-32 object-cover rounded cursor-pointer"
              onClick={() => handleImageClick(photo.url)}
            />
            {userType === 'admin' && (
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default PhotoAlbum;