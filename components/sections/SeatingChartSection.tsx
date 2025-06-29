import Image from 'next/image';
import CollapsibleSection from '../CollapsibleSection';

const tableData = [
  {
    id: 1,
    guests: [
      'John & Jane Smith',
      'Robert & Emma Johnson',
      'Michael & Sarah Williams'
    ]
  },
  {
    id: 2,
    guests: [
      'David & Jennifer Brown',
      'James & Lisa Miller',
      'William & Jessica Davis'
    ]
  },
  {
    id: 3,
    guests: [
      'Richard & Amanda Wilson',
      'Joseph & Ashley Moore',
      'Thomas & Elizabeth Taylor'
    ]
  },
  {
    id: 4,
    guests: [
      'Charles & Megan Anderson',
      'Christopher & Lauren Thomas',
      'Daniel & Stephanie Jackson'
    ]
  },
  {
    id: 5,
    guests: [
      'Matthew & Rebecca White',
      'Anthony & Laura Harris',
      'Mark & Michelle Martin'
    ]
  },
  {
    id: 6,
    guests: [
      'Donald & Kimberly Thompson',
      'Steven & Emily Garcia',
      'Paul & Hannah Martinez'
    ]
  },
  {
    id: 7,
    guests: [
      'Andrew & Samantha Robinson',
      'Joshua & Victoria Clark',
      'Kenneth & Grace Rodriguez'
    ]
  },
  {
    id: 8,
    guests: [
      'Kevin & Rachel Lewis',
      'Brian & Christina Lee',
      'George & Amber Walker'
    ]
  },
  {
    id: 9,
    guests: [
      'Timothy & Nicole Hall',
      'Ronald & Olivia Allen',
      'Jason & Tiffany Young'
    ]
  }
];

export default function SeatingChartSection() {
  return (
    <CollapsibleSection title="Guest Seating Chart">
      {/* Welcome Image (centered, wide, gold) */}
      <div className="flex justify-center my-2">
        <Image
          src="/images/welcome.png"
          alt="Welcome"
          width={900}
          height={120}
          className="h-auto w-full max-w-3xl object-contain"
          priority
        />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10 mt-10 max-w-5xl mx-auto">
        {tableData.map((table) => (
          <div
            key={table.id}
            className="p-6 text-center"
          >
            <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: 'Montserrat' }}>TABLE {table.id}</h3>
            <div className="space-y-1">
              {table.guests.map((guest, index) => (
                <p key={index} className="text-gray-700" style={{ fontFamily: 'Montserrat' }}>{guest}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
