import os
import glob
import re
import time
from PIL import Image

def optimize_frames():
    source_dir = r"D:\TAV Figma\public\assets\sa-ban-3d"
    dest_desktop_dir = os.path.join("assets", "sa-ban-3d")
    dest_mobile_dir = os.path.join("assets", "sa-ban-3d", "mobile")
    
    os.makedirs(dest_desktop_dir, exist_ok=True)
    os.makedirs(dest_mobile_dir, exist_ok=True)
    
    pattern = os.path.join(source_dir, "frame_*.webp")
    files = glob.glob(pattern)
    
    def extract_number(filepath):
        basename = os.path.basename(filepath)
        match = re.search(r'frame_(\d+)\.webp$', basename, re.IGNORECASE)
        if match:
            return int(match.group(1))
        return 0
        
    files.sort(key=extract_number)
    print(f"Found {len(files)} source WebP frames in {source_dir}")
    
    start_time = time.time()
    total_desktop_bytes = 0
    total_mobile_bytes = 0
    
    for idx, filepath in enumerate(files, start=1):
        num_str = f"{idx:03d}"
        filename = f"frame_{num_str}.webp"
        
        desktop_path = os.path.join(dest_desktop_dir, filename)
        mobile_path = os.path.join(dest_mobile_dir, filename)
        
        img = Image.open(filepath)
        if img.mode != "RGB":
            img = img.convert("RGB")
            
        # Desktop version (1920x1080, quality=78 - crisp architecture details, sharp edges)
        img.save(desktop_path, "WEBP", quality=78, method=6)
        total_desktop_bytes += os.path.getsize(desktop_path)
        
        # Mobile version (960x540, quality=75 - ultra-fast download & instant decode)
        img_mobile = img.resize((960, 540), Image.Resampling.LANCZOS)
        img_mobile.save(mobile_path, "WEBP", quality=75, method=6)
        total_mobile_bytes += os.path.getsize(mobile_path)
        
        if idx % 20 == 0 or idx == len(files):
            print(f"Processed {idx}/{len(files)} frames...")
            
    elapsed = time.time() - start_time
    print(f"All 121 frames processed in {elapsed:.2f}s!")
    print(f"Desktop total: {total_desktop_bytes/1024/1024:.2f} MB (Avg: {total_desktop_bytes/len(files)/1024:.1f} KB/frame)")
    print(f"Mobile total: {total_mobile_bytes/1024/1024:.2f} MB (Avg: {total_mobile_bytes/len(files)/1024:.1f} KB/frame)")

if __name__ == "__main__":
    optimize_frames()
