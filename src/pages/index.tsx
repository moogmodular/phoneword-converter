import { type NextPage } from 'next'
import Head from 'next/head'
import { ConverterForm } from '../components/ConverterForm'

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Phoneword converter" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-white pt-8">
                <ConverterForm />
            </main>
        </>
    )
}

export default Home
