import React from 'react'
import Social from './Media/Social';
import Name from './socials/Name';
import ShortCut from './profle/ShortCut';

const SocialFormSection = () => {
      const [selectedPlatform, setSelectedPlatform] = useState("ALL");
  return (
    <div>
      <div>
      <Social selected={selectedPlatform} setSelected={setSelectedPlatform} />
      <Name platform={selectedPlatform} />
      <ShortCut platform={selectedPlatform} />
    </div>
    </div>
  )
}

export default SocialFormSection
