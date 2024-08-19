import React, { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import "./layout.css";
import Output from './output';

const Layout = (props) => {
    const [input, setInput] = useState('0');
    const [result, setResult] = useState('');
    const [active, setActive] = useState(false);


    const handleClick = useCallback((event) => {
        const value = event.target.value;

        if (value === '=') {
            if (input !== '') {
                try {
                    const result = evaluate(input);
                    setResult(input + '=');
                    setInput(result.toString());
                } catch (err) {
                    setResult('Math Error');
                    setInput('');
                }
            }
        } else if (value === 'C') {
            setInput('0');
            setResult('');
        } else if (value === 'DEL') {
            let str = input;
            str = str.slice(0, -1);
            setInput(str || '0');
        } else if (input === '0') {
            setInput(value);
        } else {
            setInput(input + value);
        }
    }, [input]); 

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;

            if (key === 'Enter') {
                handleClick({ target: { value: '=' } });
            } else if (key === 'Escape') {
                handleClick({ target: { value: 'C' } });
            } else if (key === 'Backspace') {
                handleClick({ target: { value: 'DEL' } });
            } else if (['+', '-', '*', '/'].includes(key)) {
                handleClick({ target: { value: key } });
            } else if (!isNaN(key) || key === '.') {
                handleClick({ target: { value: key } });
            }
        };

        const icons = document.querySelectorAll('i');

        const handleClickIcon = () => {
            setActive(prevActive => !prevActive);
        };

        icons.forEach(icon => {
            icon.addEventListener('click', handleClickIcon);
        });

        if (active) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            icons.forEach(icon => {
                icon.removeEventListener('click', handleClickIcon);
            });
            document.body.classList.remove('light-theme');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [active, handleClick]); 

    return (
        <div className="frame">
            <div className="calculator">
                <br />
                <div className='curve-1'></div>
                <div className='curve-2'></div>
                <div className='header button'>
                    <i className={`ri-sun-line ${active ? 'active' : ''}`}></i>
                    <i className={`ri-moon-line ${active ? 'active' : ''}`}></i>
                </div>
                <Output user={input} answer={result} className="value"/>
                <h3>My Calculator</h3>
                <div className="keys">
                    <input type="button" value={'C'} className='button clear' onClick={handleClick} />
                    <input type="button" value={'DEL'} className='button clear' onClick={handleClick} />
                    <input type="button" value={'%'} className='button operator' onClick={handleClick} />
                    <input type="button" value={'/'} className='button operator' onClick={handleClick} />

                    <input type="button" value={'7'} className='button ' onClick={handleClick} />
                    <input type="button" value={'8'} className='button ' onClick={handleClick} />
                    <input type="button" value={'9'} className='button ' onClick={handleClick} />
                    <input type="button" value={'*'} className='button operator' onClick={handleClick} />

                    <input type="button" value={'4'} className='button ' onClick={handleClick} />
                    <input type="button" value={'5'} className='button ' onClick={handleClick} />
                    <input type="button" value={'6'} className='button ' onClick={handleClick} />
                    <input type="button" value={'-'} className='button operator' onClick={handleClick} />

                    <input type="button" value={'1'} className='button ' onClick={handleClick} />
                    <input type="button" value={'2'} className='button ' onClick={handleClick} />
                    <input type="button" value={'3'} className='button ' onClick={handleClick} />
                    <input type="button" value={'+'} className='button operator' onClick={handleClick} />

                    <input type="button" value={'0'} className='button ' onClick={handleClick} />
                    <input type="button" value={'.'} className='button ' onClick={handleClick} />
                    <input type="button" value={'='} className='button equal-sign operator' onClick={handleClick} />
                </div>
            </div>
        </div>
    );
};

export default Layout;
