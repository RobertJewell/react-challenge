import { useState } from "react";
import Head from "next/head";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import * as Yup from "yup";

interface IPostSubmission {
	title: string;
	slug: string;
	excerpt?: string;
	content: string;
}

enum currentFormState {
	"visible",
	"processing",
	"submitted",
}

const createPost = () => {
	const [formVisibility, setFormVisibility] = useState(
		currentFormState.visible
	);

	// form validation rules
	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Title is required"),
		content: Yup.string().required("Content is required"),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	// get functions to build form with useForm() hook
	const { register, handleSubmit, formState, reset } =
		useForm<IPostSubmission>(formOptions);
	const { errors } = formState;

	const onSubmit: SubmitHandler<IPostSubmission> = async (data) => {
		//update state to loading
		setFormVisibility(currentFormState.processing);

		//Replace new line characters with HTML for email
		const contentWithBreaks = data.content.replace(/\n/g, "<br>");

		await setDoc(doc(db, "posts", data.slug), {
			...data,
			content: contentWithBreaks,
		});

		reset();

		//update state to confirmed
		let makeConfirmationVisible = setTimeout(() => {
			setFormVisibility(currentFormState.visible);
		}, 600);
	};

	return (
		<Layout>
			<Head>
				<title>Next.js Blog Example with Firebase</title>
			</Head>
			<Container>
				<section className="flex flex-col items-center mt-16 mb-16 md:flex-row md:justify-between md:mb-12">
					<h1 className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl md:pr-8">
						Create a post.
					</h1>
				</section>
				<section className="m-auto">
					<form
						className={
							`w-full max-w-lg px-8 py-16 mx-auto transition-opacity delay-200 duration-500 md:flex-1` +
							(formVisibility !== currentFormState.visible &&
								"pointer-events-none opacity-0")
						}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex flex-wrap mb-6 -mx-3">
							<div className="w-full px-3 md:mb-0">
								<label
									className="block mb-2 font-black text-black"
									htmlFor="title"
								>
									Title
								</label>
								<input
									className={`block w-full px-4 py-3 mb-2 leading-tight text-gray-800 border-black border-2 rounded-xl focus:outline-none focus:border-accent-main  ${
										errors.title ? "is-invalid" : ""
									}`}
									id="title"
									type="name"
									// name="title"
									placeholder=""
									{...register("title")}
								/>
								<div className="text-red-600 ">{errors.title?.message}</div>
							</div>
						</div>
						<div className="flex flex-wrap mb-6 -mx-3">
							<div className="w-full px-3">
								<label
									className="block mb-2 font-black text-black"
									htmlFor="slug"
								>
									Slug
								</label>
								<input
									className="block w-full px-4 py-3 mb-2 leading-tight text-gray-800 border-2 border-black appearance-none rounded-xl focus:outline-none"
									type="text"
									// name="slug"
									id="slug"
									autoComplete="slug"
									{...register("slug")}
								/>
							</div>
						</div>
						<div className="flex flex-wrap mb-6 -mx-3">
							<div className="w-full px-3">
								<label
									className="block mb-2 font-black text-black"
									htmlFor="excerpt"
								>
									Excerpt
								</label>
								<input
									className="block w-full px-4 py-3 mb-2 leading-tight text-gray-800 border-2 border-black appearance-none rounded-xl focus:outline-none"
									type="text"
									// name="slug"
									id="excerpt"
									autoComplete="excerpt"
									{...register("excerpt")}
								/>
							</div>
						</div>
						<div className="flex flex-wrap mb-6 -mx-3">
							<div className="w-full px-3">
								<label className="block mb-2 font-black text-black">
									Content
								</label>
								<textarea
									className={`block w-full h-48 px-4 py-2 mb-2 leading-tight text-gray-800 border-black border-2  appearance-none resize-none rounded-xl  focus:outline-none  ${
										errors.content ? "is-invalid" : ""
									}`}
									id="content"
									// name="content"
									{...register("content")}
								></textarea>
								<div className="text-red-600">{errors.content?.message}</div>
							</div>
						</div>
						<div className="flex flex-col justify-between sm:flex-row">
							<button
								aria-label="Submit form"
								className="w-full p-2 mt-8 text-center text-white align-middle transition-colors bg-black border-2 rounded-lg sm:mt-0 sm:w-36 hover:bg-gray-800 "
								type="submit"
							>
								Send
							</button>
						</div>
					</form>
				</section>
			</Container>
		</Layout>
	);
};

export default createPost;
