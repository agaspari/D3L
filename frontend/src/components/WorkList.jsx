import React from 'react'
import Tabs from './Tabs'

export default function WorkList() {
    return (
        <div className="WorkList">
            <Tabs>
                <div label="All"> 
                    All assignments here.
                </div> 
                <div label="Active"> 
                    All active assingments here. 
                </div> 
                <div label="Completed"> 
                    All completed here.
                </div> 
            </Tabs>
        </div>
    )
}
