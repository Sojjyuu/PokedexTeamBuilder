import { Redirect } from "expo-router";

/**
 * ไฟล์นี้แทนหน้าตัวอย่าง Tab Two ที่มากับ Expo template
 * และจะส่งผู้ใช้กลับไปยังหน้า Pokédex ทันที
 *
 * สามารถลบไฟล์นี้ได้ หลังจากตรวจว่าใน _layout.tsx มีการซ่อน route "two" แล้ว
 */
export default function RemovedTemplateScreen() {
  return <Redirect href="/" />;
}
