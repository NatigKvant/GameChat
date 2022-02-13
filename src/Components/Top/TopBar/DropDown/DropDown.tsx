import React, {FC} from 'react'
import './DropDown.css'
import {DropDownPropsType} from '../../../../Types/Types'

const DropDown: FC<DropDownPropsType> = ({languages}) => {
    return (
        <div>
            <div>
                <select className='select' name='option'>
                    {languages.map(language =>
                        <option value={language.value}
                                key={language.id}
                        >
                            {language.name}
                        </option>
                    )}
                </select>
            </div>
        </div>
    )
}

export default DropDown