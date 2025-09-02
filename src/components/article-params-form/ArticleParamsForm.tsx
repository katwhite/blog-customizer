import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	params: typeof defaultArticleState;
	onSubmit: (newState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	params,
	onSubmit,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [state, setState] = useState(params);
	const handleSubmit = (e: SyntheticEvent) => {
		onSubmit(state);
		e.preventDefault();
	};
	const handleReset = () => {
		setState(defaultArticleState);
		onSubmit(defaultArticleState);
	};

	const handleChange = (key: keyof typeof state, value: OptionType) => {
		setState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					isOpen ? setIsOpen(false) : setIsOpen(true);
				}}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						onChange={(val) => {
							handleChange('fontFamilyOption', val);
						}}
						title='шрифт'></Select>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(val) => {
							handleChange('fontSizeOption', val);
						}}
						title='размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						selected={state.fontColor}
						onChange={(val) => {
							handleChange('fontColor', val);
						}}
						title='цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={(val) => {
							handleChange('backgroundColor', val);
						}}
						title='цвет фона'></Select>
					<Select
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={(val) => {
							handleChange('contentWidth', val);
						}}
						title='ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
