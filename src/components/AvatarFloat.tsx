export default function AvatarFloat() {
  return (
    <figure className="float">
      <span className="float__title">avatar.png</span>
      <div className="float__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avatar.png" alt="Portrait illustration of Islam Taha" width={512} height={512} />
      </div>
      <figcaption className="float__cap">
        <span>Cairo, Egypt</span>
        <span className="float__open">● remote / relocation</span>
      </figcaption>
    </figure>
  );
}
