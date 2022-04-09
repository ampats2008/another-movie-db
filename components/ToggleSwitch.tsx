import { useEffect } from "react"
import { useToggle } from "../hooks/useToggle"

type Props = {
  renderStyle: (status: boolean, toggleStatus: () => void) => JSX.Element
  toggleAction: () => void
}

const ToggleSwitch = ({ toggleAction, renderStyle }: Props) => {

  const [status, toggleStatus]: [boolean, () => void] = useToggle(false)

  useEffect(() => {
    if (status === undefined) return
    
    toggleAction()

  }, [status])

  return renderStyle(status, toggleStatus);
}

export default ToggleSwitch
