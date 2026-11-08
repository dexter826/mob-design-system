# M.O.B — Official Brand Identity Kit

Bộ nhận diện thương hiệu chính thức cho **M.O.B** (hoặc **mob**), được thiết kế theo triết lý **Cyber Monolith**: kiến trúc góc vuông 0px radius, hệ thống lưới 16px kỷ luật cao và màu điểm nhấn Neon Green `#00cc5c`.

---

## 1. Cấu trúc thư mục (File Structure)

Thư mục `mob-logo/` được tinh gọn và phân cấp chuyên nghiệp thành 3 nhóm tài nguyên chuẩn:

```
mob-logo/
├── README.md                      # Tài liệu quy chuẩn kỹ thuật & hướng dẫn sử dụng
│
├── vectors/                       # File vector SVG gốc (Scale vô hạn, không vỡ nét)
│   ├── mob-symbol.svg             # Biểu trưng màu chuẩn Neon (#00cc5c) trên nền trong suốt
│   ├── mob-symbol-dark.svg        # Biểu trưng đơn sắc đen (#000000) cho tài liệu in ấn / nền sáng
│   ├── mob-symbol-light.svg       # Biểu trưng đơn sắc sáng (#ededed) cho nền tối / ảnh
│   ├── mob-lockup-dark.svg        # Khóa chữ ngang chuẩn trên nền tối (#0a0a0a) cho Top Nav Bar
│   ├── mob-lockup-light.svg       # Khóa chữ ngang nền sáng (Biểu trưng xanh + Chữ đen)
│   ├── mob-lockup-mono-black.svg  # Khóa chữ ngang đen 100% cho in ấn đen trắng
│   ├── mob-lockup-mono-white.svg  # Khóa chữ ngang trắng 100% làm watermark / nền tối
│   ├── mob-lockup-stacked.svg     # Khóa chữ dọc dạng vuông (cho Avatar, Profile, App Card)
│   ├── mob-wordmark.svg           # Riêng cụm chữ "M.O.B" dạng vector path độc lập
│   └── og-cover.svg               # Khung ảnh card mạng xã hội dạng vector (1200×630)
│
├── png/                           # Ảnh raster PNG độ phân giải cao (High-Res 1200px - 2400px)
│   ├── mob-symbol.png             # Biểu trưng độc lập (1200×1200, trong suốt)
│   ├── mob-lockup-dark.png        # Khóa chữ ngang nền tối chuẩn (1200px width)
│   ├── mob-lockup-light.png       # Khóa chữ ngang nền sáng (1200px width)
│   ├── mob-lockup-stacked.png     # Khóa chữ dọc dạng vuông (1200×1200)
│   └── og-cover.png               # Ảnh bìa chia sẻ mạng xã hội (OpenGraph 1200×630)
│
└── web-icons/                     # Trọn bộ icon web, tab trình duyệt & PWA Mobile
    ├── favicon.ico                # File ICO tích hợp đa kích thước (16, 32, 48px)
    ├── favicon.svg                # Vector Favicon cho các trình duyệt hiện đại
    ├── favicon-16.png             # Favicon 16×16px (legacy tab)
    ├── favicon-32.png             # Favicon 32×32px (Retina tab)
    ├── favicon-48.png             # Favicon 48×48px
    ├── apple-touch-icon.png       # Chuẩn icon iOS / iPadOS 180×180px trên nền #0a0a0a
    ├── icon-192.png               # Android PWA Web App Icon (192×192px)
    ├── icon-512.png               # Android PWA Web App Icon (512×512px)
    ├── maskable-512.png           # Android Adaptive / Maskable Icon (512×512px)
    ├── site.webmanifest           # Cấu hình PWA Web App Manifest
    └── head-snippet.html          # Đoạn mã HTML nhúng sẵn toàn bộ thẻ <link> icon vào website
```

---

## 2. Ý niệm & Giải phẫu hình học (Design Anatomy)

Biểu trưng **M.O.B** kết hợp hài hòa giữa cấu trúc monolithic vững chắc và nhận diện 3 ký tự **M - O - B**:

* **Cột trụ hai bên (Pillars):** Bề rộng 40px, cao 192px, tạo thế đứng vững chãi, uy lực.
* **Đỉnh Chevron (Ký tự M):** Hai cánh vát chuẩn xác 45°, độ dày 48px, tạo hình chữ **M** và vector chuyển động tiến lên.
* **Khối ô vuông lõi (Ký tự O):** Kích thước 48×48px, đặt chính tâm, cách đều 16px ở cả 4 phía.
* **Bệ đỡ đáy (Ký tự B Anchor):** Rộng 80px, cao 24px, neo giữ toàn bộ cấu trúc.
* **Typography Display "M.O.B":** Nét dày 36px – 40px đồng điệu với biểu trưng; góc vát 45° ở các chữ M, O, B; dấu chấm là khối vuông đặc 28×28px đặt trên baseline.

---

## 3. Bảng màu quy chuẩn (Color Tokens)

| Vai trò | Mã HEX | RGB | Tỉ lệ tương phản WCAG | Ngữ cảnh ứng dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Neon Accent** | `#00cc5c` | `0, 204, 92` | 9.23:1 (AAA) trên nền tối | Biểu trưng chính, điểm nhấn chức năng |
| **Canvas Dark** | `#0a0a0a` | `10, 10, 10` | Nền canvas chuẩn | Nền giao diện dark mode, nền icon app |
| **Surface Dark** | `#121212` | `18, 18, 18` | Một bậc trên canvas | Nền thẻ (card), thanh điều hướng (nav) |
| **Text Primary** | `#ededed` | `237, 237, 237` | 16.91:1 trên canvas (AAA) | Màu chữ "M.O.B" trên nền tối |
| **Mono Dark Ink** | `#000000` | `0, 0, 0` | 16.00:1 trên nền trắng | Tài liệu in ấn đơn sắc, văn bản nền sáng |

---

## 4. Kích thước tối thiểu & Khoảng an toàn

* **Vùng an toàn (Clear Space):** Giữ khoảng trống tối thiểu bằng bề rộng cột trụ biểu tượng (**40px**) xung quanh toàn bộ logo.
* **Kích thước tối thiểu trên màn hình (Screen):**
  * Biểu tượng đơn lẻ: tối thiểu **16×16px** (dùng `favicon.svg` hoặc `favicon.ico`).
  * Khóa chữ ngang (Horizontal): rộng tối thiểu **96px**.
  * Khóa chữ dọc (Stacked): rộng tối thiểu **64px**.
* **Kích thước in ấn (Print):** Biểu trưng tối thiểu **6mm**, khóa chữ ngang tối thiểu **25mm**.

---

## 5. Quy tắc bất biến (Do's & Don'ts)

* ✔ **Giữ nguyên góc vuông 0px radius:** Tuyệt đối không bo tròn bất kỳ góc nào của logo hay chữ.
* ✔ **Dùng mảng màu phẳng (Flat Solid Fills):** Không áp dụng hiệu ứng Gradient.
* ✔ **Độ nét nguyên bản:** Không thêm hiệu ứng mờ ảo (Glow, Blur, Drop-shadow).
* ✔ **Đồng bộ tỷ lệ:** Luôn kéo dãn tỷ lệ 1:1, không bóp méo chiều ngang hay chiều dọc.
* ✔ **Dùng file vector có sẵn:** Không tự gõ lại chữ bằng các font chữ thông thường ngoài hệ thống.
