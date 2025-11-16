'use client';
import React, { FC } from 'react';
import { ChevronRight } from 'lucide-react';

interface AuraButtonProps {
    children: React.ReactNode;
    isPrimary?: boolean;
    isDisabled?: boolean;
}

const FormButton: FC<AuraButtonProps> = ({ children, isPrimary = true, isDisabled = false }) => {
    return (
        <button
            type="submit"
            disabled={isDisabled}
            style={{
                '--shadow-color': isPrimary ? 'var(--chantilly)' : 'var(--wistful)',
                fontFamily: 'Poppins, sans-serif',
            } as React.CSSProperties}
            className={`w-full flex items-center justify-center py-4 px-6 text-lg font-semibold text-white rounded-xl tracking-wider uppercase transform transition-all duration-300
      ${isDisabled
                    ? 'cursor-not-allowed! opacity-70 bg-ghost'
                    : `${isPrimary ? 'bg-chantilly hover:bg-wistful' : 'bg-wistful hover:bg-chantilly'} shadow-[0_4px_15px_-5px_var(--shadow-color)] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`
                }
      `}
        >
            {children}
            <ChevronRight className="w-5 h-5 ml-2" />
        </button>
    );
};

export default FormButton;