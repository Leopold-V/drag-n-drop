import PropTypes from 'prop-types';
import styled from "styled-components"

const color = {
    primary: '#2abd88',
    danger: '#ff4b4b'
}

export const ButtonAdd = ({ variant, children }) => {
    return (
        <ButtonStyled variant={variant}>
            <i className='fa fa-plus'></i>
            {children}
        </ButtonStyled>
    )
};

export const ButtonStyled = styled.button`
  height: 100%;
  padding: .5rem .8rem;
  background-color: ${props => color[props.variant]};
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    opacity: 0.8;
  }
`

ButtonAdd.propTypes = { 
    variant: PropTypes.string
};

ButtonAdd.defaultProps = {
    variant: 'primary'
};

export const ButtonClose = styled.button`
  position: absolute;
  top: .2rem;
  right: .5rem;
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
`