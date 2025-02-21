import { useState } from "react"
import UseDarkSide from "./useDarkMode"
import { DarkModeSwitch } from "react-toggle-dark-mode"

export default function Switcher() {
    const [colorTheme, setTheme] = UseDarkSide()
    const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false)

    const toggleDarkMode = (checked: boolean) => {
        console.log(checked);
        
       let theme= checked ? "dark" : "light"
        localStorage.setItem("theme",theme)
        setTheme(theme)
        setDarkSide(checked)
    }

    return (
        <div>
            <DarkModeSwitch
                size={50}
                checked={darkSide}
                onChange={toggleDarkMode}
            />
        </div>
    )
}