import { NextPage } from "next";
import Head from 'next/head'
import styles from '../../styles/pages/auth/Signup.module.css'
import { useState } from "react";
import { signUp } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

const Signup: NextPage = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState<Array<string> | null>(null);

    async function handleSignIn(data: any) {
        const response: any = await signUp(data);
        console.log(response);
        if (response)
            setError(response.data);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>SignUp</title>
                <meta name="description" content="SignUp forms" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
                <input {...register("username")} type="text" name="username" placeholder="Username" required />
                <input {...register("first_name")} type="text" name="first_name" placeholder="First Name" required />
                <input {...register("last_name")} type="text" name="last_name" placeholder="Last Name" required />
                <input {...register("email")} type="email" name="email" placeholder="E-mail" required />
                <input {...register("phone")} type="text" name="phone" placeholder="Phone Number" />
                <input {...register("password")} type="password" name="password" placeholder="Password" required />
                <input {...register("re_password")} type="password" name="re_password" placeholder="Password" required />
                {error && <div className={styles.errorBox}>{Object.values(error).map((e, i) => <p key={`error_${i}`}>{e[0]}</p>)}</div>}
                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}

export default Signup