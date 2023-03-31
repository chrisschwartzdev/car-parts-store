import { PropsWithChildren } from 'react';
import { combineClasses } from '../../utils/utils';
import styles from './LoadingSpinner.module.scss';

interface Props {
  size?: "small" | "large";
}

interface OrNodeProps extends Props, PropsWithChildren<any> {
  loading: boolean;
}

const LoadingSpinner = ({ size = "large" }: Props) => {
  const sizeClass = {
    small: styles.small,
    large: styles.large
  }[size];

  return (
    <div className={combineClasses(styles.loadingContainer, sizeClass)}>
      <i className={combineClasses(styles.spinner, 'fa fa-spinner')} />
    </div>
  )
}

export const LoadingSpinnerOrNode = ({ size = "small", loading, children }: OrNodeProps) => {
  return (loading ? <LoadingSpinner size={size} /> : children)
}

export default LoadingSpinner;