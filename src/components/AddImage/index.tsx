import { v4 as uuidv4 } from "uuid";

const AddImage = ({ setItems }: any) => {
  const handleImageUpload = (event: any) => {
    const selectedFiles = event.target.files;
    const newItems: {
      id: number | string;
      imgSrc: string | ArrayBuffer | null;
    }[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const dataURL = e.target.result;
        newItems.push({
          id: uuidv4(),
          imgSrc: dataURL,
        });
        if (newItems.length == selectedFiles.length) {
          setItems((prev: any) => [...prev, ...newItems]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative  border shadow-sm transition-all hover:text-blue-600 border-dashed rounded-lg px-2 py-[35px] flex flex-col gap-4 items-center justify-center">
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        className="text-2xl"
      >
        <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path>
      </svg>
      <span>Add Images</span>
      <input
        id="file"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="absolute w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default AddImage;
