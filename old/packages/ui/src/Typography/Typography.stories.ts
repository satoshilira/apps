import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../index';

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', defaultValue: 'Typography' },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const TypographyExample: Story = {
  args: {
    as: 'p',
    children: 'Example paragraph',
  },
};

export const Heading1: Story = {
  args: {
    as: 'h1',
    children: 'Heading',
  },
};

export const Heading2: Story = {
  args: {
    as: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    as: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    as: 'h4',
    children: 'Heading 4',
  },
};

export const Heading5: Story = {
  args: {
    as: 'h5',
    children: 'Heading 5',
  },
};

export const Subtitle: Story = {
  args: {
    as: 'subtitle',
    children: 'Subtitle',
  },
};

export const Caption: Story = {
  args: {
    as: 'caption',
    children: 'Caption',
  },
};
