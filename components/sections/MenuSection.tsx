import Image from 'next/image';
import CollapsibleSection from '../CollapsibleSection';

export default function MenuSection() {
  return (
    <CollapsibleSection title="Wedding Food Menu">
      {/* Side Borders */}
      <div className="relative flex justify-center items-stretch">
        {/* Left Side Border */}
        <div className="hidden md:flex flex-col justify-center">
          <Image
            src="/images/Elgent Shape-01 1.png"
            alt="Elegant Side Border"
            width={60}
            height={600}
            className="h-full min-h-[500px] w-auto object-contain"
          />
        </div>
        {/* Menu Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-2 md:px-12 py-4">
          {/* Title */}
          <div className="text-center mb-8 mt-2">
            <div className="text-lg md:text-xl text-black ml-6" style={{ fontFamily: 'Montserrat' }}>Our Wedding</div>
            <div
              className="text-[74px] md:text-[84px] font-normal mb-2"
              style={{
                fontFamily: 'Sail',
                background: 'linear-gradient(90deg, #E5B574 0%, #C18037 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                letterSpacing: '2px',
                lineHeight: 1.1,
              }}
            >
              Menu
            </div>
          </div>
          {/* Menu Sections */}
          <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-12">
            {/* STARTER */}
            <div className="w-full text-center">
              <div className="text-2xl text-black tracking-wide mb-1" style={{ fontFamily: 'Montserrat', letterSpacing: '1px' }}>STARTER</div>
              <div className="w-16 h-[2px] bg-black mx-auto mb-3" />
              <div className="text-base text-black mb-1" style={{ fontFamily: 'Montserrat' }}>15:00 Pm</div>
              <div className="text-lg text-black" style={{ fontFamily: 'Montserrat' }}>
                Chilled Avacado And Cucumber Soup,<br />
                Prosciutto - Wrapped Melon
              </div>
            </div>
            {/* MAIN */}
            <div className="w-full text-center">
              <div className="text-2xl text-black tracking-wide mb-1" style={{ fontFamily: 'Montserrat', letterSpacing: '1px' }}>MAIN</div>
              <div className="w-16 h-[2px] bg-black mx-auto mb-3" />
              <div className="text-base text-black mb-1" style={{ fontFamily: 'Montserrat' }}>15:30 Pm</div>
              <div className="text-lg text-black" style={{ fontFamily: 'Montserrat' }}>
                Herb - Crusted Rack Of Lamb, Pan-Seared<br />
                Salmon With Lemon Butter Sauce
              </div>
            </div>
            {/* DESSERT */}
            <div className="w-full text-center">
              <div className="text-2xl text-black tracking-wide mb-1" style={{ fontFamily: 'Montserrat', letterSpacing: '1px' }}>DESSERT</div>
              <div className="w-16 h-[2px] bg-black mx-auto mb-3" />
              <div className="text-base text-black mb-1" style={{ fontFamily: 'Montserrat' }}>16:00 Pm</div>
              <div className="text-lg text-black" style={{ fontFamily: 'Montserrat' }}>
                Classic Tiramisu, Lemon Sorbet With<br />
                Fresh Berries
              </div>
            </div>
          </div>
        </div>
        {/* Right Side Border */}
        <div className="hidden md:flex flex-col justify-center">
          <Image
            src="/images/Elgent Shape-01 1.png"
            alt="Elegant Side Border"
            width={60}
            height={600}
            className="h-full min-h-[500px] w-auto object-contain"
          />
        </div>
      </div>
    </CollapsibleSection>
  );
}
