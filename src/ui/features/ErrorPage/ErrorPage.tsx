import s from './ErrorPage.module.scss'

const ErrorPage = () => {
    return (
        <div className={s.errorPageContainer}>
           <p className={s.errorPage}>Error 404</p>
        </div>
    )
}

export default ErrorPage