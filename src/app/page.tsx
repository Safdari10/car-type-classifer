import Upload from "./components/Upload";

const Page = () => {
  return (
    <div className="min-h-screen w-full px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center gap-6">
        <header className="max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
            Vehicle image analysis
          </p>
          <h1 className="text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            Car Type Classifier
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Upload a clear vehicle photo and prepare it for classification.
          </p>
        </header>

        <Upload />
      </section>
    </div>
  );
};

export default Page;
