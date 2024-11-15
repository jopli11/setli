/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import theme from '../../styles/theme'; // Ensure this path is correct based on your project structure

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const StyledButton = styled.button<{ className?: string }>`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.offWhite};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.highlight};
  }
`;

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default Button;
