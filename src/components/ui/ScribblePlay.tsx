import { STOP_MOTION_PATHS } from './StopMotionIcon';

export default function ScribblePlay({ size = 48 }: { size?: number }) {
  return <svg className="scribble-play" width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <g>{STOP_MOTION_PATHS.play.map((path, index) => <path key={index} d={path} />)}</g>
  </svg>;
}
