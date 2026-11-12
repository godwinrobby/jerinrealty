import React from 'react';
import { Property } from '../types';
import { X, Heart, Trash2, ArrowRight, MessageSquare } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoritedProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onEnquire: (property: Property) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  favoritedProperties,
  onRemoveFavorite,
  onSelectProperty,
  onEnquire,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#17213A]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-purple-200 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#6246EA] to-[#2878FF] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#FF7043] fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-editorial tracking-tight">Saved Estates</h2>
              <p className="text-xs text-purple-100">{favoritedProperties.length} properties in your private wishlist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {favoritedProperties.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-12 h-12 text-purple-200 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-[#17213A]">No Saved Properties Yet</h3>
              <p className="text-xs text-[#727B91] max-w-xs mx-auto">
                Tap the heart icon on any estate card to save it for quick review and comparison.
              </p>
            </div>
          ) : (
            favoritedProperties.map((prop) => (
              <div
                key={prop.id}
                className="group relative rounded-2xl border border-purple-100 p-3 bg-purple-50/40 hover:bg-purple-50/80 transition-all flex gap-3 items-center"
              >
                <img
                  src={prop.mainImage}
                  alt={prop.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectProperty(prop);
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                    className="text-xs font-bold text-[#17213A] truncate cursor-pointer hover:text-[#6246EA]"
                  >
                    {prop.title}
                  </h4>
                  <p className="text-[11px] text-[#727B91] truncate mt-0.5">{prop.neighborhood}</p>
                  <p className="text-xs font-mono font-bold text-[#6246EA] mt-1">{prop.priceDisplay}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="text-[11px] font-bold text-[#6246EA] hover:underline"
                    >
                      View Details
                    </button>
                    <span className="text-stone-300">•</span>
                    <button
                      onClick={() => {
                        onClose();
                        onEnquire(prop);
                      }}
                      className="text-[11px] font-bold text-[#FF7043] hover:underline"
                    >
                      Enquire
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFavorite(prop.id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-white transition-colors"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoritedProperties.length > 0 && (
          <div className="p-4 border-t border-purple-100 bg-white">
            <button
              onClick={() => {
                onClose();
                onEnquire(favoritedProperties[0]);
              }}
              className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#6246EA] to-[#2878FF] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire Entire Saved Portfolio</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
