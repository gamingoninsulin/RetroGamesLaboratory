const consoles = {
    'PS1': 'Sony_-_PlayStation/Named_Boxarts',
    'PS2': 'Sony_-_PlayStation_2/Named_Boxarts',
    'PS3': 'Sony_-_PlayStation_3/Named_Boxarts',
    'NintendoDS': 'Nintendo_-_Nintendo_DS/Named_Boxarts',
    'NintendoSwitch': 'Nintendo_-_Nintendo_Switch/Named_Boxarts',
  };
  
  // Function to download images
  async function downloadImage(url, consoleName, fileName) {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, `${consoleName}/${fileName}`);
  }
  
  (async () => {
    for (const [consoleName, consolePath] of Object.entries(consoles)) {
      const url = `https://raw.githubusercontent.com/libretro-thumbnails/libretro-thumbnails/master/${consolePath}/`;
      try {
        const response = await fetch(`https://api.github.com/repos/libretro-thumbnails/libretro-thumbnails/contents/${consolePath}`);
        const files = await response.json();
        const imageFiles = files.filter(file => file.name.endsWith('.png'));
  
        for (const file of imageFiles) {
          await downloadImage(url + file.name, consoleName, file.name);
          console.log(`Downloaded: ${file.name}`);
        }
      } catch (error) {
        console.error(`Failed to fetch images for ${consoleName}:`, error);
      }
    }
  })();
  