import { ReactChild, ReactFragment, ReactPortal } from 'react'
import styles from './index.less'

const Introduction = (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) => {
  return (
    <div className={styles.introduction}>
      <div className={styles.wrap}>
        <span className={styles.title}>{props.children}</span>
      </div>
    </div>
  )
}

export default Introduction