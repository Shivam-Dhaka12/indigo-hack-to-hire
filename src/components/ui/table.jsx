import * as React from 'react';
import { cn } from '../../utils/cn';

const Table = React.forwardRef(({ className, ...props }, ref) => (
	<div className="relative w-full overflow-auto">
		<table
			ref={ref}
			className={cn(
				'w-full caption-bottom text-sm',
				'bg-transparent text-gray-300',
				className
			)}
			{...props}
		/>
	</div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn(
			'[&_tr]:border-b',
			'bg-transparent text-zinc-300',
			className
		)}
		{...props}
	/>
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn(
			'[&_tr:last-child]:border-0',
			'bg-transparent text-gray-300',
			className
		)}
		{...props}
	/>
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn(
			'border-t bg-transparent text-gray-300 font-medium [&>tr]:last:border-b-0',
			className
		)}
		{...props}
	/>
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			'border-b border-zinc-700 transition-color shover:bg-gray-950',
			'bg-transparent text-gray-300 hover:bg-zinc-900',
			className
		)}
		{...props}
	/>
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			'h-12 px-4 align-middle font-medium text-gray-400 text-center',
			className
		)}
		{...props}
	/>
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn(
			'p-4 align-middle text-gray-300 font-semibold text-center',
			className
		)}
		{...props}
	/>
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn('mt-4 text-sm text-gray-300', className)}
		{...props}
	/>
));
TableCaption.displayName = 'TableCaption';

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
