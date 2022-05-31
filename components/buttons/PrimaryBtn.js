import styles from './PrimaryBtn.module.css';

const PrimeryBtn = ({value , disabled}) => {
    return ( <button disabled={disabled} className={styles.button}>{value}</button> );
}
 
export default PrimeryBtn;