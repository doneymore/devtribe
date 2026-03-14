import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroSection } from "./heroSection";

// Mock Next.js Image component so Jest can render it in JSDOM
jest.mock("next/image", () => (props: any) => {
  // Strip out Next.js-specific props that aren't valid on a plain <img>
  const { priority, ...rest } = props;
  return <img {...rest} />;
});

describe("HeroSection", () => {
  const defaultProps = {
    title: "Build your tech career",
    subtitle: "Join DevTribe today",
    description: "Learn, network, and grow your skills with our community.",
    buttonText: "Get Started",
    imageSrc: "/test-image.jpg",
    imageAlt: "Hero image",
  };

  test("renders title, subtitle, description and button", () => {
    render(<HeroSection {...defaultProps} />);

    expect(
      screen.getByRole("heading", {
        name: defaultProps.title,
        level: 1,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: defaultProps.buttonText,
    });
    expect(button).toBeInTheDocument();
  });

  test("calls onButtonClick when button is clicked", () => {
    const handleClick = jest.fn();

    render(<HeroSection {...defaultProps} onButtonClick={handleClick} />);

    const button = screen.getByRole("button", {
      name: defaultProps.buttonText,
    });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("uses primary button styles by default", () => {
    render(<HeroSection {...defaultProps} />);

    const button = screen.getByRole("button", {
      name: defaultProps.buttonText,
    });

    expect(button.className).toMatch(/bg-blue-900/);
  });
});

