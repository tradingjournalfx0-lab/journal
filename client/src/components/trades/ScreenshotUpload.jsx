export default function ScreenshotUpload() {

  return (

    <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center">

      <input
        type="file"
        className="hidden"
        id="screenshot"
      />

      <label
        htmlFor="screenshot"
        className="cursor-pointer">

        <div className="text-purple-400 text-lg font-semibold">

          Upload Screenshot

        </div>

        <p className="text-gray-400 text-sm mt-2">

          PNG, JPG supported

        </p>

      </label>

    </div>

  );
}