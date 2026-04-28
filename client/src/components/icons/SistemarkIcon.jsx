import SvgIcon from '@mui/material/SvgIcon';

export default function PersonalBlogIcon() {
  return (
    <SvgIcon sx={{ width: 'auto', height: 28, mr: 2 }} viewBox="0 0 105 24">
      {/* Journal cover */}
      <rect x="4" y="2" width="16" height="20" rx="2" fill="#4876EF" />
      {/* Spine divider */}
      <line x1="8" y1="2" x2="8" y2="22" stroke="white" strokeWidth="1" strokeOpacity="0.35" />
      {/* Binding dots */}
      <circle cx="6" cy="8" r="0.9" fill="white" fillOpacity="0.75" />
      <circle cx="6" cy="12" r="0.9" fill="white" fillOpacity="0.75" />
      <circle cx="6" cy="16" r="0.9" fill="white" fillOpacity="0.75" />
      {/* Text lines on page */}
      <line x1="10" y1="8" x2="18" y2="8" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="11" x2="18" y2="11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="14" x2="18" y2="14" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="17" x2="15" y2="17" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      {/* Label */}
      <text
        x="25"
        y="16.5"
        fill="currentColor"
        fontSize="15"
        fontWeight="700"
        fontFamily="Roboto, Helvetica, Arial, sans-serif"
        letterSpacing="0.3"
        color='black'
      >
        Logbook
      </text>
    </SvgIcon>
  );
}
