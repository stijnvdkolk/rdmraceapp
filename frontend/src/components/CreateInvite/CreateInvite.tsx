import { Button, Card, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { createInvite } from '../../API/Chat';
import { InviteBuilder } from '../../classes/invites';
import IProps from '../IProps';

export default function CreateInvite(props: IProps) {
  const { onClick } = props;
  const [currentSelectOption, setCurrentSelectOption] =
    React.useState<string>('TEAM_MEMBER');
  const handleSelectOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSelectOption(event.target.value);
  };

  const [currentMaxUses, setCurrentMaxUses] = React.useState(1);
  const [currentDate, setCurrentDate] = React.useState<string>();

  const selectOptions = [
    {
      value: 'TEAM_MEMBER',
      label: 'Team Member',
    },
    {
      value: 'SPONSOR',
      label: 'Sponsor',
    },
    {
      value: 'MARKETING',
      label: 'Marketing',
    },
    {
      value: 'ADMIN',
      label: 'Admin',
    },
  ];

  function sendRequest() {
    if (currentDate && currentMaxUses && currentSelectOption) {
      var invitebuilder = new InviteBuilder(
        currentMaxUses,
        currentSelectOption,
        new Date(currentDate)
      );

      createInvite(invitebuilder);
      if (onClick) {
        onClick();
      }
    }
  }
  return (
    <Card
      sx={{
        width: '400px',
        height: '400px',
      }}
    >
      <TextField
        id="datetime-local"
        label="Expiry date"
        type="datetime-local"
        sx={{ width: '250px', marginTop: '40px' }}
        InputLabelProps={{
          shrink: true,
        }}
        value={currentDate}
        onChange={(event) => setCurrentDate(event.target.value)}
      />
      <br />
      <TextField
        type="number"
        label="Max uses"
        error={currentMaxUses < 1}
        helperText={currentMaxUses < 1 ? 'Min. 1' : ''}
        sx={{
          width: '250px',
          marginTop: '20px',
        }}
        value={currentMaxUses}
        onChange={(event) => {
          const maxUses =
            parseInt(event.target.value) < 1 ? 1 : parseInt(event.target.value); // niet kleiner dan 1 :D
          setCurrentMaxUses(maxUses);
        }}
      />
      <br />
      <>
        <TextField
          select
          label="Role"
          value={currentSelectOption}
          onChange={handleSelectOption}
          sx={{
            width: '250px',
            marginTop: '20px',
            textAlign: 'left',
          }}
        >
          {selectOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </>
      <br />
      <Button
        variant="contained"
        sx={{ borderRadius: '16px', width: '100px', marginTop: '20px' }}
        onClick={sendRequest}
      >
        Create
      </Button>
    </Card>
  );
}
