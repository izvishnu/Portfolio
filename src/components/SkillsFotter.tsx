import Image from "next/image";
import React from "react";

interface SkillItem {
  alt?: string;
  img?: any;
  name?: string;
  icon?: string;
}

interface MyComponentProps {
  items: SkillItem[];
}

const SkillsFooter: React.FC<MyComponentProps> = ({ items }) => {
  return (
    <>
      {items?.map((item, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors"
        >
          {item.icon && (
            <Image 
              src={item.icon} 
              alt={item.name || item.alt || "Skill icon"} 
              className="w-12 h-12 object-contain"
              width={48}
              height={48}
            />
          )}
          <span className="text-sm text-center font-medium text-muted-foreground">
            {item.name}
          </span>
        </div>
      ))}
    </>
  );
};

export default SkillsFooter;