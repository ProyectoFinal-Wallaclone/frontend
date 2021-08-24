import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { authLogin, authLogout } from '../store/actions';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  title: {
      margin: theme.spacing(1),
  },
}));

export default function Home() {
  
  const classes = useStyles();


  return (

    <div className={styles.container}>
      <Head>
        <title>Wallaclone</title>
        <meta name="description" content="Generated by the nameless team" />

      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className="team-title"> WALLACLONE </span>
        </h1>

        <div className={styles.grid}>
          <Link className={styles.card} href='/user/dashboard' passHref>
            <div className={styles.card} >
              <h3>  Dashboard &rarr;  </h3>
            </div>
          </Link>

          <Link className={styles.card} href='/login' passHref>
            <div className={styles.card} >
              <h3>  Login Page &rarr;  </h3>
            </div>
          </Link>

          <Link className={styles.card} href='/register' passHref>
            <div className={styles.card} >
              <h3>  Register Page &rarr;  </h3>
            </div>
          </Link>
          <Link className={styles.card} href='/adverts' passHref>
            <div className={styles.card} >
              <h3>  Adverts Page &rarr;  </h3>
            </div>
          </Link>

          <Link className={styles.card} href='/create-advert' passHref>
            <div className={styles.card} >
              <h3>  Create new Advert &rarr;  </h3>
            </div>
          </Link>


        </div>
      </main>

      <style jsx>{`
                    
                    h3{
                        color:#09f;
                    }
                    .team-title{
                      color:#09f;
                    }

                    `}</style>

      <footer className={styles.footer}>

        Powered by{' '}
        <span className={styles.logo}>
          THE NAMELESS TEAM
        </span>

      </footer>
    </div >



  )
}
