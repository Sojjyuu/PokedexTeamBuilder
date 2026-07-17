# Pokédex Team Builder — Expo

แอปพลิเคชัน Pokédex ที่พัฒนาด้วย Expo, React Native, TypeScript และ Expo Router  
ข้อมูลโปเกมอนดึงจาก PokeAPI และบันทึกรายการโปรด/ทีมด้วย AsyncStorage

## ความสามารถของระบบ

- ค้นหาโปเกมอนจากชื่อโดยไม่สนใจตัวพิมพ์เล็กหรือพิมพ์ใหญ่
- รายการเปลี่ยนทันทีตามข้อความที่ค้นหา
- แสดง Empty State เมื่อไม่พบข้อมูล
- กดชนิดของโปเกมอนเพื่อกรองโปเกมอนชนิดเดียวกัน
- เพิ่มหรือลบโปเกมอนที่ชื่นชอบจากหน้ารายการและหน้ารายละเอียด
- รายการโปรดยังคงอยู่เมื่อเปลี่ยนหน้าหรือเปิดแอปใหม่
- มีหน้า Favorites และ Empty State เมื่อยังไม่มีรายการ
- สร้างทีมโปเกมอนได้สูงสุด 6 ตัว
- แสดงรายละเอียด ส่วนสูง น้ำหนัก Ability และ Base Stats

## Reusable Components

1. `components/PokemonCard.tsx` — แสดงโปเกมอนแต่ละตัว
2. `components/PokemonSearchBar.tsx` — ช่องค้นหา
3. `components/EmptyState.tsx` — แสดงกรณีไม่มีข้อมูลหรือเกิดข้อผิดพลาด
4. `components/TypeFilter.tsx` — ตัวกรองประเภทโปเกมอน

## การติดตั้ง

### 1. สร้าง Expo Router Project

```bash
npx create-expo-app@latest PokedexTeamBuilder --template tabs
cd PokedexTeamBuilder
```

### 2. ติดตั้ง AsyncStorage

```bash
npx expo install @react-native-async-storage/async-storage
```

### 3. นำ Source Code ไปวาง

คัดลอกโฟลเดอร์ต่อไปนี้จากชุด Source Code นี้ ไปแทนที่หรือเพิ่มในโปรเจกต์

```text
app/
components/
constants/
contexts/
services/
types/
```

### 4. เปิดโปรเจกต์

```bash
npx expo start
```

หลังจากนั้นสแกน QR Code ด้วย Expo Go หรือกด `w` เพื่อเปิดบนเว็บ

## โครงสร้างไฟล์

```text
PokedexTeamBuilder/
├── app/
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── favorites.tsx
│   │   └── team.tsx
│   └── pokemon/
│       └── [name].tsx
├── components/
│   ├── EmptyState.tsx
│   ├── PokemonCard.tsx
│   ├── PokemonSearchBar.tsx
│   └── TypeFilter.tsx
├── constants/
│   └── typeColors.ts
├── contexts/
│   └── PokemonAppContext.tsx
├── services/
│   └── pokeapi.ts
└── types/
    └── pokemon.ts
```

## สมาชิกและหน้าที่

> แก้ไขชื่อและรหัสนักศึกษาก่อนส่งงาน

### สมาชิกคนที่ 1

- ชื่อ–นามสกุล: `[กรอกชื่อ]`
- รหัสนักศึกษา: `[กรอกรหัส]`
- หน้าที่:
  - พัฒนาหน้า Pokédex
  - ระบบค้นหาชื่อ
  - ระบบกรองตามชนิด

### สมาชิกคนที่ 2

- ชื่อ–นามสกุล: `[กรอกชื่อ]`
- รหัสนักศึกษา: `[กรอกรหัส]`
- หน้าที่:
  - ระบบ Favorites
  - AsyncStorage
  - หน้า Favorites และ Empty State

### สมาชิกคนที่ 3

- ชื่อ–นามสกุล: `[กรอกชื่อ]`
- รหัสนักศึกษา: `[กรอกรหัส]`
- หน้าที่:
  - หน้ารายละเอียดโปเกมอน
  - ระบบ Team Builder
  - ทดสอบระบบและจัดทำ README

## Checklist ก่อนส่ง

- [ ] แก้ไขชื่อสมาชิกและหน้าที่ใน README
- [ ] ทดสอบค้นหาด้วยตัวพิมพ์เล็กและตัวพิมพ์ใหญ่
- [ ] ทดสอบกรณีค้นหาไม่พบ
- [ ] ทดสอบกดชนิดโปเกมอน
- [ ] ทดสอบเพิ่มและลบ Favorites
- [ ] ปิดและเปิดแอปใหม่เพื่อทดสอบการบันทึกข้อมูล
- [ ] ทดสอบหน้า Favorites ตอนยังไม่มีรายการ
- [ ] Push Source Code ขึ้น GitHub
- [ ] ส่ง GitHub URL เข้า Classroom
