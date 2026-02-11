export default function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-end px-8 gap-4">
      <button className="text-sm font-medium text-gray-600">로그인</button>
      <button className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg">회원가입</button>
    </header>
  );
}