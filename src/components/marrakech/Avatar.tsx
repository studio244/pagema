import avatarAsset from "@/assets/marrakech/avatar.png.asset.json";
const avatar = avatarAsset.url;

interface AvatarProps {
  className?: string;
  size: string;
  placeholder: string;
  text: string;
  statusIcon: string;
  state: string;
}

const Avatar = ({ className, size, placeholder, text, statusIcon, state }: AvatarProps) => {
  const variantBodies: Record<string, React.ReactNode> = {
    "False/md/Default/False/False": (
      <>
        {/* Avatar */}
        <img className={`w-12 h-12 rounded-full border-[1.8012666702270508px] border-white ${className ?? ""}`.trim()} src={avatar} alt="Avatar" />
      </>
    )
  };
  const variantKey = [placeholder, size, state, statusIcon, text].map(String).join("/");
  const defaultKey = "False/md/Default/False/False";
  return variantBodies[variantKey] ?? variantBodies[defaultKey];
};

export default Avatar;
