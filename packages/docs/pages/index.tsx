import type { NextPage } from 'next';
import { Layout } from '../components/layout/layout';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Layout>bla</Layout>
        </div>
    );
};

export default Home;
