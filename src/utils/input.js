import React from 'react';
export const TextInput = ({ handler, meta }) => (
    <div>
        <input type="text"
            placeholder={`Enter ${meta.label}`}
            {...handler() } />
    </div>
)
export const PasswordInput = ({ handler, meta }) => (
    <div>
        <input type="password"
            placeholder={`Enter ${meta.label}`}
            {...handler() } />
    </div>
)

